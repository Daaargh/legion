import React from "react";
import ReactDOM from "react-dom";
import { ScoreBoard } from "./ScoreBoard";
import { Result } from "./Result";
import { DiceContainer } from "./DiceContainer";
import { ButtonContainer } from "./ButtonContainer";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export function Game() {
  const diceImages = [
    "images/die-1.png",
    "images/die-2.png",
    "images/die-3.png",
    "images/die-4.png",
    "images/die-5.png",
    "images/die-6.png",
  ];

  const dieArray = [
    {
      key: 1,
      value: 1,
      imgsrc: "images/die-1.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 2,
      value: 2,
      imgsrc: "images/die-2.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 3,
      value: 3,
      imgsrc: "images/die-3.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 4,
      value: 4,
      imgsrc: "images/die-4.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 5,
      value: 5,
      imgsrc: "images/die-5.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 6,
      value: 6,
      imgsrc: "images/die-6.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
  ];

  const playerStats = [
    {
      key: "Player One",
      player: "Player One",
      turnScore: 990,
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

  const [gameWon, setGameWon] = useState(false);

  const [activePlayer, setActivePlayer] = useState(0);
  const [player, setPlayer] = useState(playerStats);
  const [dice, setDice] = useState(dieArray);
  const [dieFrequency, setDieFrequency] = useState([]);
  const [resultMessage, setResultMessage] = useState(
    `${player[activePlayer].player}'s Turn`
  );
  const [turnScore, setTurnScore] = useState();
  const takeTurn = () => {
    rollDice();
    countDice();
    checkScore();
    // if (player.isReroll) {
    //   if (player.rerollScore <= player.turnScore) {
    //     player[activePlayer].turnScore = 0;
    //   } else {
    //     player.turnScore = player.rerollScore;
    //     player.rerollScore = 0;
    //   }
    // }
    // player.isReroll = true;
  };

  ///////////////// ROLLING ///////////////////////

  const rollDice = () => {
    const diceCopy = [...dice];
    for (const die of diceCopy) {
      if (!die.isSaved) {
        const randomNumber = Math.floor(Math.random() * 6);
        die.value = randomNumber + 1;
        die.imgsrc = diceImages[randomNumber];
        setDice(diceCopy);
      }
    }
  };

  /////////////// COUNTING DICE //////////////////////

  const countDice = () => {
    setResultMessage("COUNTING DICE");

    const frequencyCount = [0, 0, 0, 0, 0, 0];
    for (const die of dice) {
      frequencyCount[die.value - 1]++;
    }

    console.log(frequencyCount);
    setDieFrequency(frequencyCount);
    console.log(dieFrequency);
  };

  /////////////// CALCULATE SCORE //////////////////////

  const checkScore = () => {
    if (checkDoubles()) {
      return;
    }

    if (checkCircus()) {
      return;
    }

    if (checkSixOfAKind()) {
      return;
    }

    if (!checkOnes()) {
      return;
    }

    checkTwos();
    checkThrees();
    checkFours();
    checkFives();
    checkSixes();
  };

  const setTurnScoreAndResultMessage = (totalFreq, points, message) => {
    setTurnScore((prev) => prev + Number(totalFreq) * points);
    setResultMessage((prev) => prev + `${totalFreq} ${message}`);
  };
  const checkDoubles = () => {
    let doubleCounter = 0;
    for (const number of dieFrequency) {
      number === 2 && doubleCounter++;
    }

    if (doubleCounter === 3) {
      setResultMessage("DOUBLES! ");
      setTurnScore(1000);
      return true;
    }
  };

  const checkSixOfAKind = () => {
    for (const freq of dieFrequency) {
      if (freq === 6) {
        setResultMessage("SIX OF A KIND! ");
        setTurnScore(5000);
        return true;
      }
    }
  };

  const checkCircus = () => {
    let counter = 0;
    for (const freq of dieFrequency) {
      freq === 1 && counter++;
    }

    if (counter === 6) {
      setResultMessage("CIRCUS! ");
      setTurnScore(2000);
      return true;
    }
  };

  const checkOnes = () => {
    // setResultMessage("COUNTING ONES");

    const totalOnes = dieFrequency[0];
    if (totalOnes >= 4) {
      setResultMessage("4 Ones...Your total score is 0");
      // set total score to 0
      return false;
    }
    if (totalOnes > 0) {
      setTurnScoreAndResultMessage(totalOnes, 5, "ones : ");
      // setTurnScore((prev) => prev + totalOnes * 5);
      // setResultMessage((prev) => prev + `${totalOnes} ones : `);
    }
  };

  const checkTwos = () => {
    const totalTwos = dieFrequency[1];
    if (totalTwos > 0) {
      setTurnScoreAndResultMessage(totalTwos, 10, "twos : ");
      // setTurnScore((prev) => prev + totalTwos * 10);
      // setResultMessage((prev) => prev + `${totalTwos} twos : `);
    }
  };

  const checkThrees = () => {
    const totalThrees = dieFrequency[2];
    if (totalThrees >= 3) {
      setTurnScoreAndResultMessage(totalThrees, 50, "threes : ");
      // setTurnScore((prev) => prev + 50);
      // setResultMessage((prev) => prev + " 3 threes : ");
    }
  };

  const checkFours = () => {
    const totalFours = dieFrequency[3];
    if (totalFours >= 3) {
      setTurnScoreAndResultMessage(totalFours, 100, "fours : ");
      // setTurnScore((prev) => prev + 100);
      // setResultMessage((prev) => prev + "3 fours : ");
    }
  };

  const checkFives = () => {
    const totalFives = dieFrequency[4];
    if (totalFives >= 3) {
      setTurnScoreAndResultMessage(totalFives, 500, "fives : ");
      // setTurnScore((prev) => prev + 500);
      // setResultMessage((prev) => prev + "3 fives : ");
    }
  };

  const checkSixes = () => {
    const totalSixes = dieFrequency[5];
    if (totalSixes >= 3) {
      setTurnScoreAndResultMessage(totalSixes, 1000, "sixes : ");
      // setTurnScore((prev) => prev + 1000);
      // setResultMessage((prev) => prev + "3 sixes : ");
    }
  };

  /////////////// END TURN ///////////////////////

  // const endPlayerTurn = () => {
  //   );
  // };

  /////////////// SWITCH PLAYER //////////////////

  const switchPlayer = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
    // endPlayerTurn();
  };

  return (
    <>
      <ScoreBoard />
      <Result
        activePlayer={player[activePlayer].player}
        resultMessage={resultMessage}
        turnScore={turnScore}
      />
      <DiceContainer dice={dice} />
      <ButtonContainer
        rollButtonClick={() => takeTurn(player[activePlayer])}
        endButtonClick={switchPlayer}
      />
    </>
  );
}
