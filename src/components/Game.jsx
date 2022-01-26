import React from "react";
import ReactDOM from "react-dom";
import { ScoreBoard } from "./ScoreBoard";
import { Result } from "./Result";
import { DiceContainer } from "./DiceContainer";
import { ButtonContainer } from "./ButtonContainer";
import { useState } from "react";

export function Game() {
  const dice = [
    {
      key: 1,
      die: 1,
      imgsrc: "images/die-1.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 2,
      die: 2,
      imgsrc: "images/die-2.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 3,
      die: 3,
      imgsrc: "images/die-3.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 4,
      die: 4,
      imgsrc: "images/die-4.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 5,
      die: 5,
      imgsrc: "images/die-5.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 6,
      die: 6,
      imgsrc: "images/die-6.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
  ];

  const players = [
    {
      key: "Player One",
      player: "Player One",
      turnScore: 0,
      rerollScore: 0,
      isReroll: false,
      totalScore: 0,
    },

    {
      key: "Player Two",
      player: "Player Two",
      turnScore: 0,
      rerollScore: 0,
      isReroll: false,
      totalScore: 0,
    },
  ];

  // The current player whose turn it is
  //   const playerTurn = [players[0].player, players[1].player];

  const [activePlayer, setActivePlayer] = useState(0);
  const [gameWin, setGameWon] = useState(false);

  const switchPlayer = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
    console.log(activePlayer);
  };

  const endPlayerTurn = () => {
    players[activePlayer].turnScore = 0;
    players[activePlayer].rerollScore = 0;
    players[activePlayer].isReroll = false;
  };

  return (
    <>
      <ScoreBoard />
      <Result activePlayer={players[activePlayer].player} />
      <DiceContainer dice={dice} />
      <ButtonContainer endButtonClick={switchPlayer} />
    </>
  );
}
