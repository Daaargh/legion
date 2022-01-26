import React from "react";

export function ScoreBoard() {
  return (
    <div className="score-board">
      <div className="user-label badge">P1</div>
      <div className="computer-label badge">P2</div>
      <span className="user-score">0</span>:
      <span className="comp-score">0</span>
    </div>
  );
}
