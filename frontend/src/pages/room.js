import React, { useEffect, useCallback, useState } from 'react';
import { Typography, Box, TextField, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { EVENTS } from 'constants/socket-events';
import { useSocket } from 'context/socket-context';

const RoomPage = () => {
  const socket = useSocket();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback(
    (message) => {
      setMessages([...messages, message]);
    },
    [messages],
  );

  // useEffect(() => {
  //   socket.emit(EVENTS.JOIN_ROOM, location.pathname.substr(1)); // temporary solution

  //   return () => {
  //     socket.emit(EVENTS.LEAVE_ROOM);
  //   };
  // }, [socket, location.pathname]);

  useEffect(() => {
    socket.on(EVENTS.NEW_MESSAGE, addMessage);

    return () => {
      socket.off(EVENTS.NEW_MESSAGE, addMessage);
    };
  }, [socket, messages, addMessage]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMessageSending = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    socket.emit(EVENTS.NEW_MESSAGE, {
      text: inputValue,
      author: socket.id,
      room: location.pathname.substr(1),
    });

    setInputValue('');
  };

  return (
    <Box width="500px" height="100%" m="0 auto" pt="100px">
      <Box>
        {messages.map(({ author, text }, index) => (
          <Typography key={index}>
            {author && (
              <Typography component="span" color="textSecondary">
                {author}:{' '}
              </Typography>
            )}
            <Typography component="span">{text}</Typography>
          </Typography>
        ))}
      </Box>
      <form onSubmit={handleMessageSending}>
        <TextField value={inputValue} onChange={handleInputChange} fullWidth />
        <Button type="submit">Send</Button>
      </form>
    </Box>
  );
};

export default RoomPage;
