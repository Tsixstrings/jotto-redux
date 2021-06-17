import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

function App() {
  //TODO: get props from shared state
  const success = false;
  const secretWord = "party";
  const guessedWords = [];
  return (
    <div data-test="component-app" className="App">
      <div style={{ width: "50%" }}>
        <h1>Jotto</h1>
        <Congrats success={success} />
        <Input success={success} />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    </div>
  );
}

export default App;
