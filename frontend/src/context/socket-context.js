import React, { useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const SocketContext = React.createContext();

function SocketProvider({ children }) {
  const socket = io('http://localhost:4000');
  const providerValue = useMemo(() => socket, [socket]);

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <SocketContext.Provider value={providerValue}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useSocketContext() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error(`useSocket must be used within a SocketProvider`);
  }

  return context;
}

function useSocket(info) {
  const socket = useSocketContext();

  return socket;
}

export { SocketProvider, useSocket };
