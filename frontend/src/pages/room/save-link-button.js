import React from 'react';
import { IconButton, Tooltip, Zoom } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const SaveLinkButton = () => {
  return (
    <Tooltip TransitionComponent={Zoom} title="Click for saving room link">
      <IconButton
        onClick={() => {
          var url = window.location.href;
        }}
      >
        <SaveIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default SaveLinkButton;
