const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const options = {};
const port = process.env.PORT || 4000;
const uuid = require('uuid');

const io = require('socket.io')(server, options);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

io.on('connection', (socket) => {
  console.log(`${socket.id} is joined`);

  socket.on('create room', ({ name, password }) => {
    const roomId = uuid.v4();
    socket.join(roomId, (id) => {
      socket.emit('join room', roomId);
    });
  });

  socket.on('join room', (roomId) => {
    socket.join(roomId, () => {
      io.to(roomId).emit('new message', {
        text: `${socket.id} joined the room`,
      });
    });
  });

  socket.on('new message', ({ text, author, room }) => {
    console.log(text, ' ', author, ' ', room);
    if (room) {
      io.to(room).emit('new message', { text, author });
    }
  });

  socket.on('leave room', (roomId) => {
    socket.leave(roomId, () => {
      io.to(roomId).emit('new message', {
        text: `${socket.id} left the room`,
      });
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} is disconnected`);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
