import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import { useSocket } from 'context/socket-context';

const HomePage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const socket = useSocket();

  const createRoom = () => {
    console.log(name, password);
    socket.emit('create room', { name, password });
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetForm = () => {
    setName('');
    setPassword('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name) {
      createRoom(name);
      resetForm();
    }

    console.log(socket);
  };

  return (
    <div style={{ margin: '50px auto', width: '400px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Username"
          value={name}
          onChange={changeName}
          fullWidth
        />
        <TextField
          placeholder="Password"
          value={password}
          onChange={changePassword}
          fullWidth
        />
        <Button variant="outlined" type="submit">
          Let's make it
        </Button>
      </form>
    </div>
  );
};

export default HomePage;
