import React from "react";

export function RollButton(props) {
  return (
    <button
      // isReroll={props.isReroll}
      onClick={props.rollButtonClick}
      className="roll-button"
      type="button"
    >
      {props.isReroll === true ? "Reroll Dice" : "Roll Dice"}
    </button>
  );
}
