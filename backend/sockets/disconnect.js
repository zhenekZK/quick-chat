/*
 * Handle user disconnection
 */

module.exports = (socket, io) => {
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
};
