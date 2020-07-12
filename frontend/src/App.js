import React, { useEffect } from "react";
import io from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io.connect("http://localhost:4000");

    socket.on("connect", () => {
      console.log(socket.connected);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
