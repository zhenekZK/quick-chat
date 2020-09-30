module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} is joined`);

    require('./join-room')(socket, io);
    require('./room-message')(socket);
    require('./typing')(socket);
    require('./leave-room')(socket, io);
    require('./disconnect')(socket, io);
  });
};
