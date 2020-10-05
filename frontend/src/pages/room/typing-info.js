import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const TypingInfo = ({ typingUsers }) => {
  if (!typingUsers.length) {
    return null;
  }

  return (
    <Typography>
      {typingUsers.length === 1
        ? `${typingUsers[0].username} is typing...`
        : `${typingUsers
            .map((user) => user.username)
            .join(', ')} are typing...`}
    </Typography>
  );
};

TypingInfo.propTypes = {
  typingUsers: PropTypes.array,
};

TypingInfo.defaultProps = {
  typingUsers: [],
};

const MemoizedTypingInfo = React.memo(TypingInfo);

export { MemoizedTypingInfo as default };
