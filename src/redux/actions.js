import {
  START_LOGIN,
  SET_USERNAME,
  SET_LOGIN_ERROR,
  SET_ACTIVE_USERS,
} from './actionTypes';

import {
  login, 
  signup, 
  sessionResponse,
  activeUsersResponse,
} from '../api/baseApi';

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
      login(username, password)
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
      signup(username, password, fullname)
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
    sessionResponse()
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
    activeUsersResponse()
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
