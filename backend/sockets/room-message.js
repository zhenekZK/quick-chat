//
// Handle room message
//

module.exports = (socket) => {
  socket.on('new message', ({ text, room }) => {
    if (room) {
      io.to(room).emit('new message', { text, author: socket.username });
    }
  });
};
