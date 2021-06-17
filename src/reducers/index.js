import { combineReducers, conbineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from './secretWordReducer'

export default combineReducers({
  success,
  guessedWords,
  secretWord
});
