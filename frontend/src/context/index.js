import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { SocketProvider } from './socket-context';
import { UserDataProvider } from './user-data-context';
import { ErrorContextProvider } from './error-context';

const AppProviders = ({ children }) => (
  <SocketProvider>
    <ErrorContextProvider>
      <UserDataProvider>
        <Router>{children}</Router>
      </UserDataProvider>
    </ErrorContextProvider>
  </SocketProvider>
);

AppProviders.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppProviders;
