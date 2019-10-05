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

function BACKEND_EVENT_TRIGGERED(nextState, { payload }) {
  nextState.entities = [...nextState.entities, payload];
}

function MODIFY_EVENT(nextState, { payload }) {
  nextState.entities = nextState.entities.map(e => {
    if (e.id === payload.id) {
      return payload;
    }
    return e;
  });
}

const reducer = createReducer(
  {
    entities: [],
    isLoading: false
  },
  {
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_EVENTS_REQUEST,
    '@@backend/ADD_EVENT': BACKEND_EVENT_TRIGGERED,
    '@@backend/USER_REGISTERED_TO_EVENT': MODIFY_EVENT,
    '@@backend/USER_UNREGISTERED_TO_EVENT': MODIFY_EVENT,
    '@@backend/EVENT_STATUS_MODIFIED': MODIFY_EVENT
  }
);

export default reducer;
