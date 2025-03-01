import React, { useState } from "react";

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleAddData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/addData", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCities(data);
      } else {
        alert("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {!isLoggedIn ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <p>Welcome, Admin! 🎉</p>
          <button onClick={handleAddData} className="add-data-button">
            {loading ? "Adding..." : "Add Data"}
          </button>

          {cities.length > 0 && (
            <table className="city-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Clues</th>
                  <th>Fun Facts</th>
                  <th>Trivia</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <td>
                      <ul>
                        {city.clues.map((clue, i) => (
                          <li key={i}>{clue}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {city.fun_fact.map((fact, i) => (
                          <li key={i}>{fact}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {city.trivia.map((trivia, i) => (
                          <li key={i}>{trivia}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
