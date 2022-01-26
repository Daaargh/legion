import React from "react";

export function Buttons() {
  return (
    <div className="button-div">
      <button className="roll-button" type="button">
        Roll Dice
      </button>
      <button className="end-button" type="button">
        End Turn
      </button>
    </div>
  );
}
