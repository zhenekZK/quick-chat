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
      const id = uuid.v4();
      console.log(id);

      rooms[id] = {
        id,
        users: [socket.username],
        keyword,
      };

      socket.join(id, () => {
        socket.emit('join room', id);
        socket.isAdmin = true;
        socket.roomId = id;

        io.to(id).emit('new message', {
          text: `${socket.username} joined the room`,
        });
      });
    }
  });
};
