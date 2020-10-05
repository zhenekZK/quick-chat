const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const options = { upgradeTimeout: 30000 };
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
global.rooms = {};

require('./sockets')(io);

server.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
