import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Avatar } from '@material-ui/core';

import {
  InfoMessage,
  UserMessageTextWrapper,
  UserMessageText,
} from './styled-components';

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

const MemoizedMessage = React.memo(Message);

export { MemoizedMessage as default };
