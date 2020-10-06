/*
 * Handle leaving the room
 */

const handleLeavingRoom = require('../helpers/handle-leaving-room');

module.exports = (socket, io) => {
  socket.on('leave room', () => {
    const { roomId } = socket;

    socket.leave(roomId, () => {
      handleLeavingRoom(socket, io);
      socket.isAdmin = false;
      socket.roomId = null;
    });
  });
};
