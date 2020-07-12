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
    console.log(name, password);
    const roomId = uuid.v4();
    console.log(roomId);
    socket.join(roomId);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
