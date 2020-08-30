import { useContext } from 'react';
import { ErrorContext } from 'context/error-context';

function useAppError() {
  const data = useContext(ErrorContext);

  if (data === undefined) {
    throw new Error(`useAppError must be used within a ErrorDataProvider`);
  }

  return data;
}

export default useAppError;
