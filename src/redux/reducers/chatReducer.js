import { SET_ACTIVE_USERS, SET_CHAT_USER } from '../actionTypes';

const initialState = {
  activeUsers: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USERS:
      return { ...state, activeUsers: action.activeUsers };
    default:
      return state;
  }
};

export default chatReducer;
