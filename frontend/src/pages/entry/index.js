import React, { useReducer, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { useSocket } from 'context/socket-context';
import { ROUTES } from 'constants/routes';
import { EVENTS } from 'constants/socket-events';
import { Button } from 'components/button';
import { Field } from 'components/field';

import { Container } from './styled-components';

const Entry = () => {
  const socket = useSocket();
  const history = useHistory();
  const [data, setData] = useReducer((s, a) => ({ ...s, ...a }), {
    name: '',
    keyword: '',
  });
  const { id: roomId } = useParams();

  useEffect(() => {
    socket.on(EVENTS.JOIN_ROOM, (roomId) => {
      history.push(`${ROUTES.ROOM}/${roomId}`);
    });
    return () => {
      socket.off(EVENTS.JOIN_ROOM);
    };
  }, [history, socket]);

  const handleFieldChange = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { name, keyword } = data;

    if (name && keyword) {
      socket.emit(EVENTS.JOIN_ROOM, { name, keyword, roomId });
    }
  };

  return (
    <Container
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Box maxWidth={500}>
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h3">
            Fill the form below to start conversation
          </Typography>
          <Box mt={3}>
            <Field
              name="name"
              variant="outlined"
              placeholder="Enter your name"
              onChange={handleFieldChange}
              fullWidth
            />
            <Field
              name="keyword"
              variant="outlined"
              placeholder="Enter your keyword"
              onChange={handleFieldChange}
              fullWidth
            />
          </Box>
          <Box align="center" mt={5}>
            <Button type="submit">Start a chat</Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Entry;
