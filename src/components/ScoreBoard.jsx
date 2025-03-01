import React from "react";

export default function ScoreBoard({ score }) {
  return (
    <div className="scoreboard">
      <p>✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}</p>
    </div>
  );
}
