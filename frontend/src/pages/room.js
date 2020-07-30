import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button } from '@material-ui/core';

import { useLocation } from 'react-router-dom';

import { useSocket } from 'context/socket-context';

const RoomPage = () => {
  const socket = useSocket();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join room');

    socket.on('new message', ({ message, author }) => {
      console.log(message, author);
    });

    return () => {
      socket.emit('leave room');
    };
  }, [socket]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    socket.emit('send message', { message: inputValue, author: socket.id });
    setInputValue('');
  };

  console.log(location);

  return (
    <Box>
      <Typography>{location.pathname}</Typography>
      <Box>
        {messages.map((message) => (
          <Typography>{message}</Typography>
        ))}
      </Box>
      <TextField value={inputValue} onChange={handleInputChange} />
      <Button onClick={handleButtonClick}>Send</Button>
    </Box>
  );
};

export default RoomPage;
