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
      key: 0,
      value: 1,
      imgsrc: "images/die-1.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 1,
      value: 2,
      imgsrc: "images/die-2.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 2,
      value: 3,
      imgsrc: "images/die-3.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 3,
      value: 4,
      imgsrc: "images/die-4.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 4,
      value: 5,
      imgsrc: "images/die-5.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
    {
      key: 5,
      value: 6,
      imgsrc: "images/die-6.png",
      isKeptThisTurn: false,
      isSaved: false,
    },
  ];

  const diceValuePositionsRef = useRef({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

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
  const unkeptScoringDieRef = useRef([0, 0, 0, 0, 0, 0]);
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
    isReroll && setSavedDice();
    setResultMessage("");
    turnScoreRef.current = 0;
    setTurnScore(0);

    rollDice();

    countDice();

    if (checkIfUnkeptScoringDice() === true) {
      console.log(true);
      checkScore();
      // checkNoScoringDice();
      setPlayerTurnScore(activePlayer, isReroll, turnScoreRef.current);

      setIsReroll(true);
    } else {
      console.log(false);

      turnScoreRef.current = 0;
      setTurnScoreAndResultMessage(0, 0, 0, "scoring dice : ");
      setPlayerTurnScore(activePlayer, isReroll, turnScoreRef.current);
    }
  };

  const setPlayerTurnScore = (activePlayer, isReroll, thisTurnScore) => {
    const playersArray = [...player];
    const currentPlayer = playersArray[activePlayer];

    currentPlayer.turnScore = thisTurnScore;
    playersArray[activePlayer] = currentPlayer;
    setPlayer(playersArray);
  };

  /////////// ROLLING //////////////////
  //#region
  const rollDice = () => {
    const diceCopy = [...dice];
    for (const die of diceCopy) {
      if (!die.isSaved) {
        const randomNumber = Math.floor(Math.random() * 6);
        diceValuePositionsRef.current[randomNumber + 1].push(die.key);
        die.value = randomNumber + 1;
        die.imgsrc = diceImages[randomNumber];
        setDice(diceCopy);
      }
    }
  };
  //#endregion

  const setSavedDice = () => {
    const theDice = [...dice];
    const poopDice = document.querySelector(".dice").children;
    for (let i = 0; i < poopDice.length; i++) {
      if (poopDice[i].classList.contains("green-glow")) {
        theDice[i].isSaved = true;
      }
    }
  };

  /////////// COUNTING DICE ////////////
  //#region
  const countDice = () => {
    dieFrequencyRef.current = [0, 0, 0, 0, 0, 0];
    unkeptScoringDieRef.current = [0, 0, 0, 0, 0, 0];
    for (const die of dice) {
      dieFrequencyRef.current[die.value - 1]++;
      if (!die.isSaved) {
        unkeptScoringDieRef.current[die.value - 1]++;
      }
    }
  };

  const checkIfUnkeptScoringDice = () => {
    // Check there is at least one 1 or one 2 in unkept scoring dice
    for (const value of unkeptScoringDieRef.current.slice(0, 2)) {
      if (value >= 1) {
        isUnkeptScoringDiceRef.current = true;
        return true;
      }
    }
    // Check there are at least three 3's, 4's, 5's or 6's in unkept scoring dice
    for (const value of unkeptScoringDieRef.current.slice(2)) {
      if (value >= 3) {
        isUnkeptScoringDiceRef.current = true;
        return true;
      }
    }
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

    checkOnesAndTwos();
    checkThreeFourFiveSix();
    checkNoScoringDice();
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
    turnScoreRef.current === 0 &&
      setTurnScoreAndResultMessage(0, 0, 0, "scoring dice : ");
  };

  /////////// Set Player total score //
  const updatePlayerScore = () => {
    const playersArray = [...player];
    const currentPlayer = playersArray[activePlayer];
    currentPlayer.totalScore += currentPlayer.turnScore;
    playersArray[activePlayer] = currentPlayer;
    setPlayer(playersArray);
  };

  /////////// RESET PLAYER STATS ///////
  const resetPlayerStats = () => {
    const players = [...player];
    for (const player of players) {
      player.turnScore = 0;
      player.rerollScore = 0;
      // player.totalScore = 0;
    }
    setPlayer(players);
  };

  /////////////// SWITCH PLAYER //////////////////

  const switchPlayer = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };
  /////////////// END TURN ///////////////////////
  const endTurn = () => {
    updatePlayerScore();
    resetPlayerStats();
    switchPlayer();
  };

  const toldy = (e) => {
    if (!dice[e.target.getAttribute("id")].isSaved && isReroll === true) {
      if (e.target.getAttribute("value") < 3) {
        e.target.classList.toggle("green-glow");
      } else if (
        e.target.getAttribute("value") >= 3 &&
        dieFrequencyRef.current[e.target.getAttribute("value") - 1] >= 3
      ) {
        const dieArray = [...e.target.parentElement.children]
          .filter(
            (child) =>
              child.getAttribute("id") !== e.target.getAttribute("id") &&
              child.getAttribute("value") === e.target.getAttribute("value")
          )
          .map((x) => x.getAttribute("id"))
          .splice(0, 2);

        if (!e.target.classList.contains("green-glow")) {
          for (const child of e.target.parentElement.children) {
            if (
              child.getAttribute("value") === e.target.getAttribute("value")
            ) {
              child.classList.remove("green-glow");
            }
          }
          e.target.classList.add("green-glow");
          e.target.parentElement.children[dieArray[0]].classList.add(
            "green-glow"
          );

          e.target.parentElement.children[dieArray[1]].classList.add(
            "green-glow"
          );
        } else {
          for (const child of e.target.parentElement.children) {
            if (
              child.getAttribute("value") === e.target.getAttribute("value")
            ) {
              child.classList.remove("green-glow");
            }
          }
        }
      }
    }
    const toldy = document.querySelector(".dice");
  };

  return (
    <>
      <ScoreBoard
        playerOneScore={player[0].totalScore}
        playerTwoScore={player[1].totalScore}
      />
      <Result
        activePlayer={player[activePlayer].player}
        resultMessage={resultMessage}
        turnScore={turnScore}
      />
      <DiceContainer method={toldy} dice={dice} />
      <ButtonContainer
        isReroll={isReroll}
        rollButtonClick={() => takeTurn(player[activePlayer])}
        endButtonClick={endTurn}
      />
    </>
  );
}
