import React from "react";

export function NewGameButton(props) {
  return (
    <button className="button" onClick={props.restartGame} type="button">
      New Game
    </button>
  );
}
