import React from "react";

export function DiceContainer() {
  const dice = [
    {
      die: 1,
      imgsrc: "images/die-1.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      die: 2,
      imgsrc: "images/die-2.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      die: 3,
      imgsrc: "images/die-3.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      die: 4,
      imgsrc: "images/die-4.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      die: 5,
      imgsrc: "images/die-5.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      die: 6,
      imgsrc: "images/die-6.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
  ];
  return (
    <div className="dice">
      {dice.map((die) => (
        <img className="die__img" src={die.imgsrc} alt="die" />
      ))}
    </div>
  );
}
