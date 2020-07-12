import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { SocketProvider } from './socket-context';

const AppProviders = ({ children }) => (
  <SocketProvider>
    <Router>{children}</Router>
  </SocketProvider>
);

AppProviders.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppProviders;
