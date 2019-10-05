import createReducer from 'model/store/createReducer';

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

const reducer = createReducer(
  {
    profile: {},
    coins: 0,
    loggedIn: false,
    isLoading: false
  },
  {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    LOGIN
  }
);

export default reducer;
