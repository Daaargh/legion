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
  const [turnScore, setTurnScore] = useState(0);
  const [dieFrequency, setDieFrequency] = useState([]);
  const [isReroll, setIsReroll] = useState(false);
  useEffect(() => {
    if (dieFrequency.length > 0) {
      checkScore();

      setPlayerTurnScore(activePlayer, isReroll, turnScore);

      setIsReroll(true);
    }
  }, [dieFrequency]);
  const [resultMessage, setResultMessage] = useState(
    `${player[activePlayer].player}'s Turn`
  );
  const takeTurn = () => {
    setResultMessage("");

    setTurnScore(0);

    rollDice();

    countDice();

    // countDice();
    // checkScore();
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

  const setPlayerTurnScore = (activePlayer, isReroll, thisTurnScore) => {
    if (isReroll === false) {
      const poop = [...player];
      player[activePlayer].turnScore = thisTurnScore;
      setPlayer(poop);
      console.log(
        `${player[activePlayer].player}'s turn score is ${player[activePlayer].turnScore}`
      );
    } else {
      player[activePlayer].rerollScore = turnScore;
      player[activePlayer].turnScore = 0;
      setPlayer(player);
      console.log(
        `${player[activePlayer].player}'s turn score is ${player[activePlayer].turnScore}`
      );
    }
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
    console.log("COUNTING DICE");

    const frequencyCount = [0, 0, 0, 0, 0, 0];
    for (const die of dice) {
      frequencyCount[die.value - 1]++;
    }

    setDieFrequency(frequencyCount);
  };

  /////////////// CALCULATE SCORE //////////////////////
  //#region
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

    if (checkOnes()) {
      return;
    }

    checkTwos();
    checkThrees();
    checkFours();
    checkFives();
    checkSixes();
  };

  const setTurnScoreAndResultMessage = (
    dieValue,
    totalFreq,
    points,
    message
  ) => {
    if (dieValue < 3) {
      setTurnScore((prev) => prev + Number(totalFreq) * points);
      setResultMessage((prev) => prev + `${totalFreq} ${message}`);
      return;
    }

    setTurnScore((prev) => prev + points);
    setResultMessage((prev) => prev + `${totalFreq} ${message}`);
  };
  const checkDoubles = () => {
    console.log(`Turn score is: ${turnScore}`);

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
    console.log(`Turn score is: ${turnScore}`);

    for (const freq of dieFrequency) {
      if (freq === 6) {
        setResultMessage("SIX OF A KIND! ");
        setTurnScore(5000);
        return true;
      }
    }
  };

  const checkCircus = () => {
    console.log(`Turn score is: ${turnScore}`);

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
    console.log(`Turn score is: ${turnScore}`);

    const totalOnes = dieFrequency[0];
    if (totalOnes >= 4) {
      setResultMessage("4 Ones...Your total score is 0");
      // set total score to 0
      return true;
    }
    if (totalOnes > 0) {
      setTurnScoreAndResultMessage(1, totalOnes, 5, "ones : ");
    }
  };

  const checkTwos = () => {
    console.log(`Turn score is: ${turnScore}`);

    const totalTwos = dieFrequency[1];
    if (totalTwos > 0) {
      setTurnScoreAndResultMessage(2, totalTwos, 10, "twos : ");
    }
  };

  const checkThrees = () => {
    console.log(`Turn score is: ${turnScore}`);

    const totalThrees = dieFrequency[2];
    if (totalThrees >= 3) {
      setTurnScoreAndResultMessage(3, 3, 50, "threes : ");
    }
  };

  const checkFours = () => {
    console.log(`Turn score is: ${turnScore}`);

    const totalFours = dieFrequency[3];
    if (totalFours >= 3) {
      setTurnScoreAndResultMessage(4, 3, 100, "fours : ");
    }
  };

  const checkFives = () => {
    console.log(`Turn score is: ${turnScore}`);

    const totalFives = dieFrequency[4];
    if (totalFives >= 3) {
      setTurnScoreAndResultMessage(5, 3, 500, "fives : ");
    }
  };

  const checkSixes = () => {
    console.log(`Turn score is: ${turnScore}`);

    const totalSixes = dieFrequency[5];
    if (totalSixes >= 3) {
      setTurnScoreAndResultMessage(6, 3, 1000, "sixes : ");
    }
  };

  //#endregion

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
        isReroll={isReroll}
        rollButtonClick={() => takeTurn(player[activePlayer])}
        endButtonClick={switchPlayer}
      />
    </>
  );
}
