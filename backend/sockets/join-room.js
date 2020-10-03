/*
 * Handle user joining into the room
 */

const uuid = require('uuid');

module.exports = (socket, io) => {
  socket.on('join room', ({ name, keyword, roomId = null }) => {
    socket.username = name;

    if (roomId) {
      // check if roomId exists
      if (rooms[roomId]) {
        if (rooms[roomId].keyword === keyword) {
          socket.join(roomId, () => {
            socket.roomId = roomId;
            socket.emit('join room', roomId);

            io.to(roomId).emit('new message', {
              text: `${socket.username} joined the room`,
            });
          });
        } else {
          socket.emit('chat error', {
            text: 'The keyword for this room is incorrect',
          });
        }
      } else {
        socket.emit('chat error', {
          text: 'There is not such rooms you are trying to join',
        });
      }
    } else {
      const roomId = uuid.v4();
      console.log(roomId);

      rooms[roomId] = {
        id: roomId,
        users: [socket.username],
        keyword,
      };

      socket.join(roomId, () => {
        socket.emit('join room', roomId);
        socket.isAdmin = true;
        socket.roomId = roomId;

        io.to(roomId).emit('new message', {
          text: `${socket.username} joined the room`,
        });
      });
    }
  });
};
