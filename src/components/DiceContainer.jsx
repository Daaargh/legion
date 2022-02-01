import React from "react";

export function DiceContainer(props) {
  // const dice = [
  //   {
  //     key: 1,
  //     die: 1,
  //     imgsrc: "images/die-1.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  //   {
  //     key: 2,
  //     die: 2,
  //     imgsrc: "images/die-2.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  //   {
  //     key: 3,
  //     die: 3,
  //     imgsrc: "images/die-3.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  //   {
  //     key: 4,
  //     die: 4,
  //     imgsrc: "images/die-4.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  //   {
  //     key: 5,
  //     die: 5,
  //     imgsrc: "images/die-5.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  //   {
  //     key: 6,
  //     die: 6,
  //     imgsrc: "images/die-6.png",
  //     isKeptThisTurn: false,
  //     isSaved: false,
  //   },
  // ];
  return (
    <div className="dice">
      {props.dice.map((die) => (
        <img className="die__img" src={die.imgsrc} alt="die" />
      ))}
    </div>
  );
}
