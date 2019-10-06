import createReducer from 'model/store/createReducer';
import { USERNAME } from 'config/api.config';

function FETCH_USER_SUCCESS(nextState, { result }) {
  nextState.profile = result.data;
  nextState.isLoading = false;
}

function FETCH_USER_FAILURE(nextState) {
  nextState.isLoading = false;
}

function FETCH_USER_REQUEST(nextState) {
  nextState.isLoading = true;
}

function LOGIN(nextState) {
  nextState.loggedIn = true;
}

function USER_MODIFIED(nextState, { payload }) {
  if (nextState.name === payload.name) {
    nextState.coins = payload.coins;
  }
}

const reducer = createReducer(
  {
    name: USERNAME, // should come from login screen also pass this to websocket
    profile: {},
    coins: 0,
    loggedIn: false,
    isLoading: false
  },
  {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    LOGIN,
    '@@backend/USER_MODIFIED': USER_MODIFIED
  }
);

export default reducer;
