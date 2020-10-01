import React, { useReducer, useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { useSocket } from 'context/socket-context';
import { EVENTS } from 'constants/socket-events';
import { Button } from 'components/button';
import { Field } from 'components/field';

import { Container, ChatContainer, InputContainer } from './styled-components';

var timeout = undefined;

const Room = () => {
  const socket = useSocket();
  const { id: roomId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSending = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    socket.emit(EVENTS.NEW_MESSAGE, {
      text: inputValue,
      room: roomId,
    });

    setInputValue('');
  };

  useEffect(() => {
    socket.on(EVENTS.NEW_MESSAGE, (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off(EVENTS.NEW_MESSAGE);
    };
  }, [socket, messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const stopTyping = () => {
    setIsTyping(false);
    socket.emit('stop typing');
  };

  const handleInputKeyDown = (event) => {
    if (isTyping === false) {
      setIsTyping(true);
      socket.emit('typing');
      timeout = setTimeout(stopTyping, 4000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(stopTyping, 4000);
    }
  };

  return (
    <Container
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <ChatContainer>
        <InputContainer>
          <form onSubmit={handleMessageSending}>
            <Field
              value={inputValue}
              placeholder="Type a message"
              variant="outlined"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              fullWidth
            />
            {/* <Button type="submit">Send</Button> */}
          </form>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default Room;
