/*
 * Handle room message broadcasting
 */

module.exports = (socket, io) => {
  socket.on('new message', ({ text }) => {
    const roomId = socket.roomId;

    if (roomId) {
      io.to(roomId).emit('new message', { text, author: socket.username });
    }
  });
};
