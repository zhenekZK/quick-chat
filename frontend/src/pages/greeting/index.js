import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { Button } from 'components/button';

import { Container } from './styled-components';

const GreetingPage = () => {
  return (
    <Container container direction="column" justify="center">
      <Typography variant="h1" align="center">
        Hi!
      </Typography>
      <Typography variant="h2" align="center">
        Start amazing conversation right now
      </Typography>
      <Box align="center" mt={4}>
        <Button>Create a room</Button>
      </Box>
    </Container>
  );
};

export default GreetingPage;
