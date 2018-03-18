import { LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/ActionTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
};

export default () => (state = INITIAL_STATE, { type }) => ({
  [LOGIN_SUCCESS]: { ...state, isLoggedIn: true },
  [LOGIN_FAILED]: state,
})[type];
