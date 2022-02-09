import React from "react";

export function RollButton(props) {
  return (
    <button
      disabled={!props.rollButtonEnabled}
      onClick={props.rollButtonClick}
      className="button"
      type="button"
    >
      {props.isReroll === true ? "Reroll Dice" : "Roll Dice"}
    </button>
  );
}
