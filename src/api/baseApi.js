import axios from 'axios';

const LOGIN = '/login'
const SIGNUP = '/signup';
const TEST_SESSION = '/test_session';
const GET_ACTIVE_USERS = '/get_active_users';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;


export const login = (username, password) => {
    return axios
      .post(
          LOGIN,
          {
          username,
          password,
          },
        );
}

export const signup = (username, password, fullname) => {
  return axios
    .post(
      SIGNUP,
      {
        username,
        password,
        fullname,
      },
    );
}

export const sessionResponse = () => {
  return axios
    .get(TEST_SESSION);
}

export const activeUsersResponse = () => 
{
  return axios
  .get(GET_ACTIVE_USERS);
} 
