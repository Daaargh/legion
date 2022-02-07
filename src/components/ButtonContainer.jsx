import React from "react";
import { EndTurnButton } from "./EndTurnButton";
import { RollButton } from "./RollButton";

export function ButtonContainer(props) {
  return (
    <div className="button-div">
      <RollButton
        rollButtonEnabled={props.rollButtonEnabled}
        rollButtonClick={props.rollButtonClick}
        isReroll={props.isReroll}
      />
      <EndTurnButton endButtonClick={props.endButtonClick} />
    </div>
  );
}
