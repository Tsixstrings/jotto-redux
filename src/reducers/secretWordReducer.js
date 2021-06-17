import { actionTypes } from "../actions";

const SecretWordReducer = (state = "", action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;

    default:
      return state;
  }
};

export default SecretWordReducer;
