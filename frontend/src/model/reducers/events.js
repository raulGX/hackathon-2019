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
            location: { name: 'Str. Zimbrului 12 nr. 2', distance: '4km away' },
            date: 1570292501219
          },
          {
            name: 'My 2nd event',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            location: { name: 'Str. Zimbrului 12 nr. 2', distance: '4km away' },
            date: 1570292501219
          },
          {
            name: 'My 3rd event',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            location: { name: 'Str. Zimbrului 12 nr. 2', distance: '4km away' },
            date: 1570292501219
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
