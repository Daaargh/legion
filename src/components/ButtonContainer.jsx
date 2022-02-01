import React from "react";
import { EndTurnButton } from "./EndTurnButton";
import { RollButton } from "./RollButton";

export function ButtonContainer(props) {
  return (
    <div className="button-div">
      <RollButton
        rollButtonClick={props.rollButtonClick}
        isReroll={props.isReroll}
      />
      <EndTurnButton endButtonClick={props.endButtonClick} />
    </div>
  );
}
