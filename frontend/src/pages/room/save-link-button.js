import React, { useCallback } from 'react';
import { IconButton, Tooltip, Zoom } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const SaveLinkButton = () => {
  const handleButtonClick = useCallback(() => {
    let dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }, []);

  return (
    <Tooltip TransitionComponent={Zoom} title="Click for saving room link">
      <IconButton onClick={handleButtonClick}>
        <SaveIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default SaveLinkButton;
