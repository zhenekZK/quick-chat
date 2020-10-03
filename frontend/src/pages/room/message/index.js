import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography, Grid, Box, Avatar } from '@material-ui/core';

const InfoMessage = styled(Typography)`
  font-style: italic;
`;

// const UserMessage = styled()``;

const UserMessageTextWrapper = styled(Box)`
  max-width: 35%;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 15px;
  padding: ${({ theme }) => `${theme.spacing(1)}px`};
`;

const UserMessageText = styled(Typography)`
  font-weight: 700;
`;

const Message = ({ author, text }) => {
  return author ? (
    <Grid container>
      {author && (
        <Box mr={2}>
          <Avatar>{author[0].toUpperCase()}</Avatar>
        </Box>
      )}
      <UserMessageTextWrapper>
        <UserMessageText color="textSecondary">{text}</UserMessageText>
      </UserMessageTextWrapper>
    </Grid>
  ) : (
    <InfoMessage variant="h4" align="center">
      {text}
    </InfoMessage>
  );
};

Message.propTypes = {
  author: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export { Message as default };
