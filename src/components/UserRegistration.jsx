import React, { useState } from "react";

export default function UserRegistration({ onRegister }) {
  const [username, setUsername] = useState("");

  const handleRegister = () => {
    if (username.trim()) {
      onRegister(username);
    }
  };

  return (
    <div className="user-registration">
      <h2>Enter a Unique Username</h2>
      <input
        type="text"
        placeholder="Your username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRegister}>Start Playing 🚀</button>
    </div>
  );
}
