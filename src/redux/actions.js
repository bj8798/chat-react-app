import { START_LOGIN, SET_USERNAME, SET_LOGIN_ERROR } from "./actionTypes";
import axios from "axios";

export const startLogin = () => {
  return {
    type: START_LOGIN,
  };
};

export const setUsername = (username, fullname) => {
  return {
    type: SET_USERNAME,
    username,
    fullname,
  };
};

export const setError = (error) => {
  return {
    type: SET_LOGIN_ERROR,
    errorMesage: error,
  };
};

export const doLogin = (username, password) => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .post("http://localhost:4000/login", {
        username,
        password,
      })
      .then((response) => {
        const fullname = response.data ? response.data.fullname : "";
        dispatch(setUsername(username, fullname));
      })
      .catch((error) => {
        console.log("error:", error.message);
        dispatch(setError("Error message found"));
      });
  };
};

export const doSignUp = (username, password, fullname) => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .post("http://localhost:4000/signup", {
        username,
        password,
        fullname,
      })
      .then((response) => {
        console.log("SignUp response:", response);
        dispatch(setUsername(username, fullname));
      })
      .catch((error) => {
        console.log("error:", error.message);
        dispatch(setError("Error message found"));
      });
  };
};
