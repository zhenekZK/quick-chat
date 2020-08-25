import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { EVENTS } from 'constants/socket-events';
import HomePage from 'pages/home';
import { useSocket } from 'context/socket-context';

function App() {
  const socket = useSocket();
  const history = useHistory();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on(EVENTS.JOIN_ROOM, (roomId) => {
      console.log('room id ', roomId);
      history.push(roomId);
    });
  }, [socket, history]);

  return (
    <Box width="100%" height="100%" minHeight="100vh">
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route path="*">
          <Redirect to={ROUTES.HOME} />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
