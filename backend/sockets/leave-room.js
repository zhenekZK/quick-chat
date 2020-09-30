/*
 * Handle leaving the room
 */

module.exports = (socket, io) => {
  socket.on('leave room', (roomId) => {
    socket.leave(roomId, () => {
      io.to(roomId).emit('new message', {
        text: `${socket.username} left the room`,
      });
    });
  });
};
