const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
const server = require('http').createServer(app);
const options = {};
const port = process.env.PORT || 4000;

const io = require('socket.io')(server, options);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// temporary rooms object
const rooms = {};

io.on('connection', (socket) => {
  console.log(`${socket.id} is joined`);
  console.log(socket.rooms);

  socket.on('join room', ({ name, password, roomId = null }) => {
    socket.username = name;

    if (roomId) {
      // check if roomId is existing
      if (rooms[roomId]) {
        if (rooms[roomId].password === password) {
          socket.join(roomId, () => {
            socket.roomId = roomId;
            socket.emit('join room', roomId);

            io.to(roomId).emit('new message', {
              text: `${socket.username} joined the room`,
            });
          });
        } else {
          socket.emit('chat error', {
            text: 'The password for this room is incorrect',
          });
        }
      } else {
        socket.emit('chat error', {
          text: 'There is not such rooms you are trying to join',
        });
      }
    } else {
      const id = uuid.v4();

      rooms[id] = {
        id,
        users: [socket.username],
        password,
      };

      socket.join(id, () => {
        socket.emit('join room', id);
        socket.isAdmin = true;
        socket.roomId = id;

        io.to(id).emit('new message', {
          text: `${socket.username} joined the room`,
        });
      });
    }
  });

  socket.on('new message', ({ text, room }) => {
    if (room) {
      io.to(room).emit('new message', { text, author: socket.username });
    }
  });

  socket.on('typing', () => {
    const { roomId, username } = socket;

    socket.to(roomId).emit('typing', { username });
  });

  socket.on('stop typing', () => {
    const { roomId, username } = socket;

    socket.to(roomId).emit('stop typing', { username });
  });

  socket.on('leave room', (roomId) => {
    socket.leave(roomId, () => {
      io.to(roomId).emit('new message', {
        text: `${socket.username} left the room`,
      });
    });
  });

  socket.on('disconnect', (reason) => {
    const roomId = socket.roomId;

    if (roomId) {
      // if socket is admin -> disconnect all users
      // if socket is a guest -> just notify about leaving
      if (socket.isAdmin) {
        io.of('/')
          .in(roomId)
          .clients((error, clients) => {
            if (error) throw error;
            for (var i = 0; i < clients.length; i++) {
              io.sockets.connected[clients[i]].disconnect(true);
            }
          });
      } else {
        io.to(roomId).emit('new message', {
          text: `${socket.username} left the room`,
        });
      }
    }
    console.log(`${socket.username} is disconnected, reason -> ${reason}`);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
