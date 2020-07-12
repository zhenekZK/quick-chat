import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import io from 'socket.io-client';

import { ROUTES } from 'constants/routes';
import HomePage from 'pages/home';

function App() {
  useEffect(() => {
    const socket = io.connect('http://localhost:4000');

    socket.on('connect', () => {
      console.log(socket.connected);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <HomePage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.HOME} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
