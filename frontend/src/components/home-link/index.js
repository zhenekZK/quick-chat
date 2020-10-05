import React, { useCallback } from 'react';
import { Box, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useLocation, useHistory } from 'react-router-dom';

import { ROUTES } from 'constants/routes';

const HomeLink = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleIconClick = useCallback(() => {
    history.push(ROUTES.HOMEPAGE);
  }, [history]);

  if (pathname === ROUTES.HOMEPAGE) {
    return null;
  }

  return (
    <Box
      position="absolute"
      width="auto"
      top={30}
      left={30}
      zIndex={100}
      color="common.white"
    >
      <IconButton onClick={handleIconClick} color="inherit">
        <HomeIcon fontSize="large" color="inherit" />
      </IconButton>
    </Box>
  );
};

export { HomeLink as default };
