import React from "react";
import { useNavigate } from "react-router-dom";
import GeoQuiz from "../components/GeoQuiz";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button className="admin-button" onClick={() => navigate("/admin")}>
        🛠️ Admin Panel
      </button>
      <GeoQuiz/>
    </div>
  );
}
