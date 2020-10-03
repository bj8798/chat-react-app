import {
  START_LOGIN,
  SET_USERNAME,
  SET_LOGIN_ERROR,
  SET_ACTIVE_USERS,
} from './actionTypes';
import axios from 'axios';

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

export const setActiveUsers = (activeUsers) => {
  return {
    type: SET_ACTIVE_USERS,
    activeUsers,
  };
};

export const doLogin = (username, password) => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .post(
        'http://localhost:4000/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const fullname = response.data ? response.data.fullname : '';
        dispatch(setUsername(username, fullname));
      })
      .catch((error) => {
        console.log('error:', error.message);
        dispatch(setError('Some issue occured'));
      });
  };
};

export const doSignUp = (username, password, fullname) => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .post(
        'http://localhost:4000/signup',
        {
          username,
          password,
          fullname,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log('SignUp response:', response);
        dispatch(setUsername(username, fullname));
      })
      .catch((error) => {
        console.log('error:', error.message);
        dispatch(setError('Some issue occured'));
      });
  };
};

export const getSessionInfo = () => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .get('http://localhost:4000/test_session', { withCredentials: true })
      .then((response) => {
        const username = response.data.username;
        const fullname = response.data.fullname;
        dispatch(setUsername(username, fullname));
      })
      .catch((error) => {
        console.log('error:', error.message);
        dispatch(setError('Some issue occured'));
      });
  };
};

export const getActiveUsers = () => {
  return (dispatch) => {
    dispatch(startLogin());
    axios
      .get('http://localhost:4000/get_active_users', { withCredentials: true })
      .then((response) => {
        const activeUsers = response.data.activeUsers;
        dispatch(setActiveUsers(activeUsers));
      })
      .catch((error) => {
        console.log('error:', error.message);
        dispatch(setError('Some issue occured'));
      });
  };
};
