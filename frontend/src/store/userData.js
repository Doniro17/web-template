import { ACTION_TYPES } from './actions';

const initialState = {
  userId: '',
  login: '',
  roles: [],
};

export default function setUser(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        userId: action.userId,
        login: action.login,
        roles: action.roles,
      };
    default:
      return state;
  }
}
