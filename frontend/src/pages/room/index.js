import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useHistory, useParams } from 'react-router-dom';

import { useSocket } from 'context/socket-context';
import { EVENTS } from 'constants/socket-events';
import { ROUTES } from 'constants/routes';
import useUserData from 'hooks/use-user-data';

import Message from './message';
import {
  Container,
  ChatContainer,
  MessagesContainer,
  Input,
  InputContainer,
  SendButtonContainer,
} from './styled-components';

var timeout = undefined;

const Room = () => {
  const socket = useSocket();
  const { username } = useUserData();
  const history = useHistory();
  const { id: roomId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Eugene joined the room' },
    { author: 'Eugene', text: 'Hello' },
    { author: 'Eugene', text: 'How are you?' },
    { author: 'Eugene', text: 'See you soon' },
    { author: 'Eugene', text: 'Hello' },
    { author: 'Eugene', text: 'How are you?' },
    { author: 'Eugene', text: 'See you soon' },
    { author: 'Eugene', text: 'Hello' },
    { author: 'Eugene', text: 'How are you?' },
    { author: 'Eugene', text: 'See you soon' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState();
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (!username) {
      // history.push(`${ROUTES.ENTRY}/${roomId}`);
    }
  }, [username]);

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

  const goToTheFirstMessage = useCallback(() => {
    if (messagesContainerRef) {
      messagesContainerRef.current.scrollBy({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messagesContainerRef]);

  useEffect(() => {
    socket.on(EVENTS.NEW_MESSAGE, (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off(EVENTS.NEW_MESSAGE);
    };
  }, [socket, messages]);

  useEffect(() => {
    goToTheFirstMessage();
  }, [messages, goToTheFirstMessage]);

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
        <MessagesContainer ref={messagesContainerRef}>
          {messages.map(({ author, text }, index) => (
            <Box key={index} mb={2}>
              <Message author={author} text={text} />
            </Box>
          ))}
        </MessagesContainer>
        <InputContainer>
          {typingUsers.length ? (
            <Typography>
              {typingUsers.length === 1
                ? `${typingUsers[0]} is typing...`
                : `${typingUsers.map((user) => `${user}, `)} are typing...`}
            </Typography>
          ) : null}
          <form onSubmit={handleMessageSending}>
            <Input
              value={inputValue}
              placeholder="Type a message"
              variant="outlined"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              fullWidth
            />
            <SendButtonContainer>
              <IconButton type="submit" color="inherit">
                <SendIcon color="inherit" />
              </IconButton>
            </SendButtonContainer>
          </form>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default Room;
