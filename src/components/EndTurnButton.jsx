import React from "react";

export function EndTurnButton(props) {
  // function handleClick() {
  //   props.endButtonClick();
  // }

  return (
    <button onClick={props.endButtonClick} className="button" type="button">
      End Turn
    </button>
  );
}
