import createReducer from 'model/store/createReducer';

function FETCH_EVENTS_SUCCESS(nextState, { result }) {
  nextState.entities = result;
  nextState.isLoading = false;
}

function FETCH_EVENTS_FAILURE(nextState) {
  nextState.isLoading = false;
}

function FETCH_EVENTS_REQUEST(nextState) {
  nextState.isLoading = true;
}

const reducer = createReducer(
  {
    entities: [],
    isLoading: false
  },
  {
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_EVENTS_REQUEST
  }
);

export default reducer;
