import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import HomePage from 'pages/home';
import RoomPage from 'pages/room';
import { useSocket } from 'context/socket-context';

function App() {
  const socket = useSocket();
  const history = useHistory();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on('open room', (roomId) => {
      console.log(roomId);
      history.push(roomId);
    });
  }, [socket, history]);

  return (
    <div className="App">
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route exact path={ROUTES.ROOM}>
          <RoomPage />
        </Route>
        <Route path="*">
          <Redirect to={ROUTES.HOME} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
