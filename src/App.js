import logo from "./logo.svg";
import "./App.css";
import { ScoreBoard } from "./components/ScoreBoard";
import { Result } from "./components/Result";
import { DiceContainer } from "./components/DiceContainer";
import { Buttons } from "./components/Buttons";

function App() {
  return (
    <div>
      <header>
        <h1>Legion</h1>
      </header>
      <ScoreBoard />
      <Result />
      <DiceContainer />
      <Buttons />
    </div>
  );
}

export default App;
