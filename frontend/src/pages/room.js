import React, { useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { useSocket } from 'context/socket-context';

const RoomPage = () => {
  const socket = useSocket();
  const location = useLocation();

  useEffect(() => {
    socket.emit('join room');

    socket.on('new message', ({ message, author }) => {
      console.log(message, author);
    });

    return () => {
      socket.emit('leave room');
    };
  }, [socket]);

  console.log(location);

  return (
    <Box>
      <Typography>{location.pathname}</Typography>
    </Box>
  );
};

export default RoomPage;
