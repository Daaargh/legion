import React from "react";

export function Result(props) {
  return (
    <div className="result">
      {/* <p>{props.activePlayer}'s Turn</p> */}
      <p className={props.winner ? "winner-text" : ""}>
        {props.resultMessage} {props.hasRolled === true ? props.turnScore : ""}
      </p>
    </div>
  );
}
