import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { Button } from 'components/button';

import { Container } from './styled-components';

const Home = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(ROUTES.CREATE);
  };

  return (
    <Container container direction="column" justify="center">
      <Typography variant="h1" align="center">
        Hi!
      </Typography>
      <Typography variant="h2" align="center">
        Start amazing conversation right now
      </Typography>
      <Box align="center" mt={4}>
        <Button onClick={handleClick}>Create a room</Button>
      </Box>
    </Container>
  );
};

export default Home;
