/*
 * Handle user typing
 */

module.exports = (socket) => {
  socket.on('typing', () => {
    const { roomId, username } = socket;

    socket.to(roomId).emit('typing', { username });
  });
};
