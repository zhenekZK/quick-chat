import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import useAppError from 'hooks/use-app-error';
import { ROUTES } from 'constants/routes';
import Home from 'pages/home';
import Entry from 'pages/entry';
import Room from 'pages/room';
import { useSocket } from 'context/socket-context';
import { ErrorPanel } from 'components/error-panel';

const Container = styled(Box)`
  background: linear-gradient(90deg, #5c258d 0%, #4389a2 100%);
`;

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
    <Container position="relative" width="100%" height="100%" minHeight="100vh">
      <ErrorPanel />
      <Switch>
        <Route exact path={ROUTES.HOMEPAGE}>
          <Home />
        </Route>
        <Route exact path={ROUTES.CREATE}>
          <Entry />
        </Route>
        <Route exact path={ROUTES.JOIN}>
          <Entry />
        </Route>
        <Route path={ROUTES.ROOM_DETAIL}>
          <Room />
        </Route>
        {/* <Route path={ROUTES.EXISTING_ROOM}>
          <Home />
        </Route> */}
        <Route path="*">
          <Redirect to={ROUTES.HOMEPAGE} />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
