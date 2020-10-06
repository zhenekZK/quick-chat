import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useHistory, useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { useSocket } from 'context/socket-context';
import { EVENTS } from 'constants/socket-events';
import { ROUTES } from 'constants/routes';
import useUserData from 'hooks/use-user-data';

import SaveLinkButton from './save-link-button';
import TypingInfo from './typing-info';
import Message from './message';
import {
  Container,
  ChatContainer,
  MessagesContainer,
  Input,
  InputContainer,
  SendButtonContainer,
} from './styled-components';

const Room = () => {
  const socket = useSocket();
  const { username } = useUserData();
  const history = useHistory();
  const { id: roomId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (!username) {
      if (roomId) {
        history.push(`${ROUTES.ENTRY}/${roomId}`);
      } else {
        history.push(ROUTES.HOMEPAGE);
      }
    }
  }, [username, history, roomId]);

  useEffect(() => {
    let unlisten = history.listen(() => {
      socket.emit('leave room');
    });
    return () => {
      unlisten();
    };
  }, [history, socket]);

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

  const scrollToTheFirstMessage = useCallback(() => {
    if (messagesContainerRef) {
      messagesContainerRef.current.scrollBy({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messagesContainerRef]);

  /* Handle incoming messages */
  useEffect(() => {
    socket.on(EVENTS.NEW_MESSAGE, (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off(EVENTS.NEW_MESSAGE);
    };
  }, [socket, messages]);

  const stopTyping = useCallback(
    (username) => {
      setTypingUsers([
        ...typingUsers.filter((user) => user.username !== username),
      ]);
    },
    [setTypingUsers, typingUsers],
  );

  /* Handle typing */
  useEffect(() => {
    socket.on(EVENTS.START_TYPING, ({ username }) => {
      const userAmongTypingUsers = typingUsers.find(
        (user) => user.username === username,
      );

      if (userAmongTypingUsers) {
        let { username, typingTimeout } = userAmongTypingUsers;
        clearTimeout(typingTimeout);
        setTypingUsers([
          ...typingUsers.filter((user) => user.username !== username),
          {
            username,
            typingTimeout: setTimeout(() => stopTyping(username), 4000),
          },
        ]);
      } else {
        setTypingUsers([
          ...typingUsers,
          {
            username,
            typingTimeout: setTimeout(() => stopTyping(username), 4000),
          },
        ]);
      }
    });
    return () => {
      socket.off(EVENTS.START_TYPING);
    };
  }, [socket, typingUsers, stopTyping]);

  const handleInputKeyDown = useCallback(
    debounce(
      () => {
        socket.emit('typing');
      },
      2000,
      { maxWait: 3000, leading: true },
    ),
    [socket],
  );

  useEffect(() => {
    scrollToTheFirstMessage();
  }, [messages, scrollToTheFirstMessage]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
          <TypingInfo typingUsers={typingUsers} />
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
      <Box position="absolute" right={40} bottom={40}>
        <SaveLinkButton />
      </Box>
    </Container>
  );
};

export default Room;
