import React from "react";

export function EndTurnButton(props) {
  function handleClick() {
    props.endButtonClick();
  }

  return (
    <button onClick={handleClick} className="end-button" type="button">
      End Turn
    </button>
  );
}
