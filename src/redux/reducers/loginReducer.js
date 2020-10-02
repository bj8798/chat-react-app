import {
  SET_USERNAME,
  START_LOGIN,
  END_LOGIN,
  SET_LOGIN_ERROR,
} from "../actionTypes";

const initialState = {
  username: undefined,
  signingIn: false,
  loginError: undefined,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
        signingIn: false,
        fullname: action.fullname,
      };
    case START_LOGIN:
      return { ...state, signingIn: true };
    case END_LOGIN:
      return { ...state, signingIn: false };
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.errorMessage, signingIn: false };
    default:
      return state;
  }
};

export default loginReducer;
