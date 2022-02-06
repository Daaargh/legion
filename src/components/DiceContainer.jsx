import React from "react";

export function DiceContainer(props) {
  return (
    <div onClick={props.method} className="dice">
      {props.dice.map((die) => (
        <img
          id={die.key}
          value={die.value}
          className="die__img"
          src={die.imgsrc}
          alt="die"
        />
      ))}
    </div>
  );
}
