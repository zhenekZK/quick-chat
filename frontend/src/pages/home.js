import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import { EVENTS } from 'constants/socket-events';
import { useSocket } from 'context/socket-context';
import useUserData from 'hooks/use-user-data';

const HomePage = () => {
  const { setUserData } = useUserData();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const socket = useSocket();

  const joinRoom = () => {
    console.log(name, password);
    socket.emit(EVENTS.JOIN_ROOM, { name, password });
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();

    if (name) {
      setUserData({ username: name });
      setStep(step + 1);
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (password) {
      joinRoom();
    }
  };

  return (
    <>
      {step === 0 ? (
        <div style={{ margin: '50px auto', width: '400px' }}>
          <form onSubmit={handleNameSubmit}>
            <TextField
              placeholder="Username"
              value={name}
              onChange={handleChangeName}
              fullWidth
            />
            <Button variant="outlined" type="submit">
              Let's make it, {name}!
            </Button>
          </form>
        </div>
      ) : (
        <div style={{ margin: '50px auto', width: '400px' }}>
          <form onSubmit={handlePasswordSubmit}>
            <TextField
              placeholder="Room password"
              value={password}
              onChange={handleChangePassword}
              fullWidth
            />
            <Button variant="outlined" type="submit">
              Set password
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default HomePage;
