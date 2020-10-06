/*
 * Handle user disconnection
 */

const handleLeavingRoom = require('../helpers/handle-leaving-room');

module.exports = (socket, io) => {
  socket.on('disconnect', (reason) => {
    const { username, roomId } = socket;

    console.log(`${username} is disconnected, reason -> ${reason}`);

    if (roomId) {
      handleLeavingRoom(socket, io);
    }
  });
};
