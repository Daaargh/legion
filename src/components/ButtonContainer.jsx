import React from "react";
import { EndTurnButton } from "./EndTurnButton";
import { RollButton } from "./RollButton";
import { NewGameButton } from "./NewGameButton";

export function ButtonContainer(props) {
  const isWinner = props.isWinner;

  if (isWinner === false) {
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
  } else {
    return (
      <div className="button-div">
        <NewGameButton restartGame={props.newGameClick} />
      </div>
    );
  }
}
