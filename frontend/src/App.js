import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import HomePage from 'pages/home';
import { useSocket } from 'context/socket-context';

function App() {
  const socket = useSocket();
  const history = useHistory();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on('chat error', (error) => {
      console.log(error.text);
    });
  }, [socket, history]);

  return (
    <Box width="100%" height="100%" minHeight="100vh">
      <Switch>
        <Route path={ROUTES.NEW_ROOM}>
          <HomePage />
        </Route>
        <Route path={ROUTES.EXISTING_ROOM}>
          <HomePage />
        </Route>
        {/* <Route exact path={ROUTES.ROOM}>
          <RoomPage />
        </Route> */}
        <Route path="*">
          <Redirect to={ROUTES.NEW_ROOM} />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
