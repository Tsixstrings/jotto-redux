import { useEffect } from "react";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { success, guessedWords, secretWord } = useSelector((state) => state);
  //TODO: get props from shared state
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

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
