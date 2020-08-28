import { useContext } from 'react';
import { UserDataContext } from 'context/user-data-context';

function useUserData() {
  const data = useContext(UserDataContext);

  if (data === undefined) {
    throw new Error(`useUserData must be used within a UserDataProvider`);
  }

  return data;
}

export default useUserData;
