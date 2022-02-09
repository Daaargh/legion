import React from "react";

export function DiceContainer(props) {
  return (
    <div onClick={props.method} className="dice">
      {props.dice.map((die) => (
        <img
          key={die.key}
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
