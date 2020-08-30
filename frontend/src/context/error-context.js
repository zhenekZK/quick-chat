import React, { useMemo, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorContext = React.createContext();

function ErrorContextProvider({ children }) {
  const [errorData, setErrorData] = useReducer((s, a) => ({ ...s, ...a }), {
    text: '',
  });

  useEffect(() => {}, []);

  const providerValue = useMemo(() => ({ errorData, setErrorData }), [
    errorData,
  ]);

  return (
    <ErrorContext.Provider value={providerValue}>
      {children}
    </ErrorContext.Provider>
  );
}

ErrorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ErrorContextProvider, ErrorContext };
