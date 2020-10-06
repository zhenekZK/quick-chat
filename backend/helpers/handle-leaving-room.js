/*
 * Handle leaving the room
 */

module.exports = (socket, io) => {
  const { username, roomId, isAdmin } = socket;

  // if socket is admin -> disconnect all users
  // if socket is a guest -> just notify about leaving
  if (isAdmin) {
    socket.to(roomId).emit('chat error', {
      text: 'Admin has left the room, so the room was destroyed',
    });
    io.of('/')
      .in(roomId)
      .clients((error, clients) => {
        if (error) throw error;
        for (var i = 0; i < clients.length; i++) {
          io.sockets.connected[clients[i]].disconnect(true);
        }
      });
  } else {
    io.to(roomId).emit('new message', {
      text: `${username} left the room`,
    });
  }
};
