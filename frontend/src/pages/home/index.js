import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

import { EVENTS } from 'constants/socket-events';
import { useSocket } from 'context/socket-context';
import useUserData from 'hooks/use-user-data';

import Greeting from 'pages/greeting';

var timeout = undefined;

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
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  console.log(typingUsers);

  useEffect(() => {
    socket.on(EVENTS.JOIN_ROOM, (roomId) => {
      history.push(roomId);
      setStep(step + 1);
    });
    socket.on(EVENTS.START_TYPING, ({ username }) => {
      if (!typingUsers.includes(username)) {
        setTypingUsers([...typingUsers, username]);
      }
    });
    socket.on(EVENTS.STOP_TYPING, ({ username }) => {
      setTypingUsers([...typingUsers.filter((user) => user !== username)]);
    });
  }, [socket, history, step, typingUsers]);

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

  function stopTyping() {
    setIsTyping(false);
    socket.emit('stop typing');
  }

  const handleInpurKeyDown = (event) => {
    if (isTyping === false) {
      setIsTyping(true);
      socket.emit('typing');
      timeout = setTimeout(stopTyping, 4000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(stopTyping, 4000);
    }
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
            return <Greeting />;
          case 1:
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
          case 2:
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
          case 3:
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
                {typingUsers.length ? (
                  <Typography>
                    {typingUsers.length === 1
                      ? `${typingUsers[0]} is typing...`
                      : `${typingUsers.map(
                          (user, index) => `${user}, `,
                        )} are typing...`}
                  </Typography>
                ) : null}
                <form onSubmit={handleMessageSending}>
                  <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInpurKeyDown}
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
