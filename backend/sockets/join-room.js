/*
 * Handle user joining into the room
 */

const uuid = require('uuid');

module.exports = (socket, io) => {
  socket.on('join room', ({ name, password, roomId = null }) => {
    socket.username = name;

    if (roomId) {
      // check if roomId exists
      if (rooms[roomId]) {
        if (rooms[roomId].password === password) {
          socket.join(roomId, () => {
            socket.roomId = roomId;
            socket.emit('join room', roomId);

            io.to(roomId).emit('new message', {
              text: `${socket.username} joined the room`,
            });
          });
        } else {
          socket.emit('chat error', {
            text: 'The password for this room is incorrect',
          });
        }
      } else {
        socket.emit('chat error', {
          text: 'There is not such rooms you are trying to join',
        });
      }
    } else {
      const id = uuid.v4();

      rooms[id] = {
        id,
        users: [socket.username],
        password,
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
