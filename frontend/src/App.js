import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import useAppError from 'hooks/use-app-error';
import { ROUTES } from 'constants/routes';
import HomePage from 'pages/home';
import { useSocket } from 'context/socket-context';
import { ErrorPanel } from 'components/error-panel';

function App() {
  const socket = useSocket();
  const history = useHistory();
  const { setErrorData } = useAppError();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on('chat error', ({ text }) => {
      setErrorData({ text });
    });
  }, [socket, history, setErrorData]);

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      minHeight="100vh"
      pt="100px"
    >
      <ErrorPanel />
      <Switch>
        <Route path={ROUTES.NEW_ROOM}>
          <HomePage />
        </Route>
        <Route path={ROUTES.EXISTING_ROOM}>
          <HomePage />
        </Route>
        <Route path="*">
          <Redirect to={ROUTES.NEW_ROOM} />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
