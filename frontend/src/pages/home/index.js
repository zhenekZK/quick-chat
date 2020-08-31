import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

import { EVENTS } from 'constants/socket-events';
import { useSocket } from 'context/socket-context';
import useUserData from 'hooks/use-user-data';

const HomePage = () => {
  const { setUserData } = useUserData();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const socket = useSocket();
  const history = useHistory();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on(EVENTS.JOIN_ROOM, (roomId) => {
      history.push(roomId);
      setStep(step + 1);
    });
  }, [socket, history, step]);

  const roomId = useMemo(() => (pathname ? pathname.slice(1) : null), [
    pathname,
  ]);

  const joinRoom = () => {
    console.log(name, password, roomId);
    socket.emit(EVENTS.JOIN_ROOM, { name, password, roomId });
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();

    if (name) {
      setUserData({ username: name });
      setStep(step + 1);
      setName('');
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (password) {
      joinRoom();
      setPassword('');
    }
  };

  const addMessage = useCallback(
    (message) => {
      setMessages([...messages, message]);
    },
    [messages],
  );

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
      room: pathname.substr(1),
    });

    setInputValue('');
  };

  return (
    <>
      {(() => {
        switch (step) {
          case 0:
            return (
              <div style={{ margin: '0 auto', width: '400px' }}>
                <form onSubmit={handleNameSubmit}>
                  <TextField
                    placeholder="Username"
                    value={name}
                    onChange={handleChangeName}
                    fullWidth
                  />
                  <Button variant="outlined" type="submit">
                    Let's make it, {name}!
                  </Button>
                </form>
              </div>
            );
          case 1:
            return (
              <div style={{ margin: '0 auto', width: '400px' }}>
                <form onSubmit={handlePasswordSubmit}>
                  <TextField
                    placeholder="Room password"
                    value={password}
                    onChange={handleChangePassword}
                    fullWidth
                  />
                  <Button variant="outlined" type="submit">
                    Set password
                  </Button>
                </form>
              </div>
            );
          case 2:
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
                  <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <Button type="submit">Send</Button>
                </form>
              </Box>
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default HomePage;
