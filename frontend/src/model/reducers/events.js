import createReducer from 'model/store/createReducer';

function FETCH_EVENTS_SUCCESS(nextState, { result }) {
  nextState.entities =
    result.length > 0
      ? result
      : [
          {
            name: 'My 1st event',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            location: { name: 'Iasi', distance: '6km away' },
            date: 1570292501219,
            participantsCount: 2343
          },
          {
            name: 'My 2nd event',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            location: { name: 'Iasi', distance: '4km away' },
            date: 1570292501219,
            participantsCount: 233
          },
          {
            name: 'My 3rd event',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            location: { name: 'Iasi', distance: '8km away' },
            date: 1570292501219,
            participantsCount: 343
          }
        ];
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
    if (e.name === payload.name) {
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
