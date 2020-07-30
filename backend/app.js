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
    console.log(`${socket.id} joined the room ${roomId}`);
    socket.join(roomId, (id) => {
      socket.emit('open room', roomId);
    });
  });

  socket.on('join room', (roomId) => {
    socket.join(roomId, (id) => {
      socket.to(roomId).emit('greeting', socket.id);
    });
  });

  socket.on('send message', ({ message, author }) => {
    console.log(socket.rooms);
  });

  socket.on('leave room', (roomId) => {
    socket.leave(roomId, () => {
      io.to(roomId).emit('new message', { message: `${socket.id} is joined` })
    })
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} is disconnected`);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
