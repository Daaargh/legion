import React from "react";

export function ScoreBoard(props) {
  return (
    <div className="score-board">
      <div className="user-label badge">P1</div>
      <div className="computer-label badge">P2</div>
      <span className="user-score">{props.playerOneScore}</span>:
      <span className="comp-score">{props.playerTwoScore}</span>
    </div>
  );
}
