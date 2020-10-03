/*
 * Handle room message broadcasting
 */

module.exports = (socket, io) => {
  socket.on('new message', ({ text, room }) => {
    if (room) {
      io.to(room).emit('new message', { text, author: socket.username });
    }
  });
};
