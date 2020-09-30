import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import { theme } from 'theme';

import { SocketProvider } from './socket-context';
import { UserDataProvider } from './user-data-context';
import { ErrorContextProvider } from './error-context';
import { ThemeProvider } from './theme-context';

const AppProviders = ({ children }) => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ErrorContextProvider>
          <UserDataProvider>
            <Router>{children}</Router>
          </UserDataProvider>
        </ErrorContextProvider>
      </SocketProvider>
    </ThemeProvider>
  </StylesProvider>
);

AppProviders.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppProviders;
