import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactDOM from 'react-dom';

import 'static/fonts/font.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppProviders from 'context';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <CssBaseline />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
