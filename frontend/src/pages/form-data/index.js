import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { Button } from 'components/button';
import { Field } from 'components/field';

import { Container } from './styled-components';

const FormDataPage = () => {
  return (
    <Container
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Box maxWidth={500}>
        <Typography variant="h3">
          Fill the form below to start conversation
        </Typography>
        <Field variant="outlined" placeholder="Enter your name" fullWidth />
        <Field variant="outlined" placeholder="Enter your keyword" fullWidth />
        <Box align="center" mt={5}>
          <Button>Start a chat</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormDataPage;
