import React, { useState, useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserDataContext = React.createContext();

function UserDataProvider({ children }) {
  const [userData, setUserData] = useState();

  const providerValue = useMemo(() => ({ userData, setUserData }), [data]);

  return (
    <UserDataContext.Provider value={providerValue}>
      {children}
    </UserDataContext.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useUserDataContext() {
  const context = useContext(UserDataContext);

  if (context === undefined) {
    throw new Error(`useUserData must be used within a UserDataProvider`);
  }

  return context;
}

function useUserData() {
  const data = useUserDataContext();

  return data;
}

export { UserDataProvider, useUserData };
