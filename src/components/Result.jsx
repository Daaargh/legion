import React from "react";

export function Result(props) {
  return (
    <div className="result">
      {/* <p>{props.activePlayer}'s Turn</p> */}
      <p>
        {props.resultMessage} {props.hasRolled === true ? props.turnScore : ""}
      </p>
    </div>
  );
}
