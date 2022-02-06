import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
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
      turnScore: 0,
      rerollScore: 0,
      totalScore: 0,
    },

    {
      key: "Player Two",
      player: "Player Two",
      turnScore: 0,
      rerollScore: 0,
      totalScore: 0,
    },
  ];

  let turnScoreRef = useRef(0);
  let isUnkeptScoringDiceRef = useRef(false);
  const unkeptScoringDieRef = useRef([]);
  const dieFrequencyRef = useRef([0, 0, 0, 0, 0, 0]);

  const [gameWon, setGameWon] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);
  const [player, setPlayer] = useState(playerStats);
  const [dice, setDice] = useState(dieArray);
  const [turnScore, setTurnScore] = useState(0);
  const [isReroll, setIsReroll] = useState(false);
  const [resultMessage, setResultMessage] = useState(
    `${player[activePlayer].player}'s Turn`
  );
  const takeTurn = () => {
    setResultMessage("");
    turnScoreRef.current = 0;
    setTurnScore(0);

    rollDice();

    countDice();

    if (checkIfUnkeptScoringDice() === true) {
      checkScore();
      checkNoScoringDice();
      setPlayerTurnScore(activePlayer, isReroll, turnScoreRef.current);

      setIsReroll(true);
    } else {
      turnScoreRef.current = 0;
      setTurnScoreAndResultMessage(0, 0, 0, "scoring dice : ");
      setPlayerTurnScore(activePlayer, isReroll, turnScoreRef.current);
    }
  };

  const setPlayerTurnScore = (activePlayer, isReroll, thisTurnScore) => {
    const playersArray = [...player];
    const currentPlayer = playersArray[activePlayer];

    // if (isReroll === false) {
    currentPlayer.turnScore = thisTurnScore;
    playersArray[activePlayer] = currentPlayer;
    setPlayer(playersArray);
    // } else {
    //   currentPlayer.rerollScore = turnScoreRef.current;

    // if (currentPlayer.rerollScore > currentPlayer.turnScore) {
    //   currentPlayer.turnScore = currentPlayer.rerollScore;
    //   currentPlayer.rerollScore = 0;
    // } else {
    //   currentPlayer.turnScore = 0;
    //   currentPlayer.rerollScore = 0;
    //   setResultMessage(
    //     `NO SCORING COMBINATION. TURN SCORE IS ${currentPlayer.turnScore} POINTS!`
    //   );
    // }
    // }
  };

  /////////// ROLLING //////////////////
  //#region
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
  //#endregion

  /////////// COUNTING DICE ////////////
  //#region
  const countDice = () => {
    dieFrequencyRef.current = [0, 0, 0, 0, 0, 0];
    for (const die of dice) {
      dieFrequencyRef.current[die.value - 1]++;
      if (!die.isSaved) {
        unkeptScoringDieRef.current[die.value - 1]++;
      }
    }
  };

  const checkIfUnkeptScoringDice = () => {
    // Check there is at least one 1 or one 2 in unkept scoring dice
    for (const value in unkeptScoringDieRef.current.slice(0, 2)) {
      if (value >= 1) {
        isUnkeptScoringDiceRef.current = true;
        return true;
      }
    }
    // Check there are at least three 3's, 4's, 5's or 6's in unkept scoring dice
    for (const value in unkeptScoringDieRef.current.slice(2)) {
      if (value >= 3) {
        isUnkeptScoringDiceRef.current = true;
        return true;
      }
    }
    // turnScoreRef.current = 0;
    // setResultMessage(
    //   `NO SCORING COMBINATION. TURN SCORE IS ${player[activePlayer].turnScore} POINTS!`
    // );
    return false;
  };
  //#endregion

  /////////// CALCULATE SCORE //////////
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

    if (checkIfFourOnes()) {
      return;
    }

    // if (checkIfUnkeptScoringDice() === false) {
    //   return;
    // }

    checkOnesAndTwos();
    checkThreeFourFiveSix();
  };

  const checkDoubles = () => {
    let doubleCounter = 0;
    for (const number of dieFrequencyRef.current) {
      number === 2 && doubleCounter++;
    }

    if (doubleCounter === 3) {
      setResultMessage("DOUBLES! ");
      setTurnScore(1000);
      turnScoreRef.current = 1000;
      return true;
    }
  };

  const checkSixOfAKind = () => {
    for (const freq of dieFrequencyRef.current) {
      if (freq === 6) {
        setResultMessage("SIX OF A KIND! ");
        setTurnScore(5000);
        turnScoreRef.current = 5000;
        return true;
      }
    }
  };

  const checkCircus = () => {
    let counter = 0;
    for (const freq of dieFrequencyRef.current) {
      freq === 1 && counter++;
    }

    if (counter === 6) {
      setResultMessage("CIRCUS! ");
      setTurnScore(2000);
      turnScoreRef.current = 2000;
      return true;
    }
  };

  const checkIfFourOnes = () => {
    const ones = dieFrequencyRef.current[0];
    if (ones >= 4) {
      setTurnScoreAndResultMessage(1, 4, 0, "ones : Total score is ");
      return true;
    }
  };

  const checkOnesAndTwos = () => {
    const [ones, twos, , , ,] = dieFrequencyRef.current;

    ones > 0 && setTurnScoreAndResultMessage(1, ones, 5, "ones : ");
    twos > 0 && setTurnScoreAndResultMessage(2, twos, 10, "twos : ");
  };

  const checkThreeFourFiveSix = () => {
    const [, , threes, fours, fives, sixes] = dieFrequencyRef.current;

    threes >= 3 && setTurnScoreAndResultMessage(3, 3, 50, "threes : ");
    fours >= 3 && setTurnScoreAndResultMessage(4, 3, 100, "fours : ");
    fives >= 3 && setTurnScoreAndResultMessage(5, 3, 500, "fives : ");
    sixes >= 3 && setTurnScoreAndResultMessage(6, 3, 1000, "sixes : ");
  };

  const setTurnScoreAndResultMessage = (
    dieValue,
    totalFreq,
    points,
    message
  ) => {
    if (dieValue < 3) {
      turnScoreRef.current += Number(totalFreq) * points;
      setTurnScore((prev) => prev + Number(totalFreq) * points);
      setResultMessage((prev) => prev + `${totalFreq} ${message}`);
      return;
    }
    turnScoreRef.current += points;
    setTurnScore((prev) => prev + points);
    setResultMessage((prev) => prev + `${totalFreq} ${message}`);
  };

  //#endregion

  /////////// APPLY SCORE //////////////
  const checkNoScoringDice = () => {
    turnScore === 0 &&
      setResultMessage(
        `NO SCORING COMBINATION. TURN SCORE IS ${player[activePlayer].turnScore} POINTS!`
      );
  };

  /////////// Set Player total score //
  const updatePlayerScore = () => {
    const currentPlayer = [...player];
    currentPlayer[activePlayer].totalScore +=
      currentPlayer[activePlayer].turnScore;
  };

  /////////// RESET PLAYER STATS ///////
  const resetPlayerStats = () => {
    const players = [...player];
    for (const player of players) {
      player.turnScore = 0;
      player.rerollScore = 0;
      player.totalScore = 0;
    }
    setPlayer(players);
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
        isReroll={isReroll}
        rollButtonClick={() => takeTurn(player[activePlayer])}
        endButtonClick={switchPlayer}
      />
    </>
  );
}
