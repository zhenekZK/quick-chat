import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

const UserDataContext = React.createContext();

function UserDataProvider({ children }) {
  const [userData, setUserData] = useReducer((s, a) => ({ ...s, ...a }), {
    username: '',
    token: '',
  });

  const providerValue = useMemo(() => ({ ...userData, setUserData }), [
    userData,
  ]);

  return (
    <UserDataContext.Provider value={providerValue}>
      {children}
    </UserDataContext.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserDataProvider, UserDataContext };
