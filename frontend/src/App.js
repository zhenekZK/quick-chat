import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import HomePage from 'pages/home';
import { useSocket } from 'context/socket-context';

function App() {
  const socket = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
  }, [socket]);

  return (
    <div className="App">
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route path="*">
          <Redirect to={ROUTES.HOME} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
