import React from "react";

export function RollButton(props) {
  return (
    <button
      onClick={props.rollButtonClick}
      className="roll-button"
      type="button"
    >
      Roll Dice
    </button>
  );
}
