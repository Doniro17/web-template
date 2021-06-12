import { ACTION_TYPES } from './actions';

const initialState = {
  isLoading: false,
};

export default function setLoading(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}
