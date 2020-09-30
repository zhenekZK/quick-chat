//
// Handle user typing
//

module.exports = (socket) => {
  socket.on('typing', () => {
    const { roomId, username } = socket;

    socket.to(roomId).emit('typing', { username });
  });

  socket.on('stop typing', () => {
    const { roomId, username } = socket;

    socket.to(roomId).emit('stop typing', { username });
  });
};
