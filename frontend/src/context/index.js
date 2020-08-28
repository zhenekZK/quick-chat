import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { SocketProvider } from './socket-context';
import { UserDataProvider } from './user-data-context';

const AppProviders = ({ children }) => (
  <SocketProvider>
    <UserDataProvider>
      <Router>{children}</Router>
    </UserDataProvider>
  </SocketProvider>
);

AppProviders.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppProviders;
