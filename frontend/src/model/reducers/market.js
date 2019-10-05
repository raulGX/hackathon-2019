import createReducer from 'model/store/createReducer';

function FETCH_MARKET_ITEMS_SUCCESS(nextState, { result }) {
  nextState.entities =
    result.length > 1
      ? result
      : [
          {
            id: 1,
            name: 'My 1st item',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 2,
            name: 'My 2nd item',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          },
          {
            id: 3,
            name: 'My 3rd item',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
          }
        ];
  nextState.isLoading = false;
}

function FETCH_MARKET_ITEMS_FAILURE(nextState) {
  nextState.isLoading = false;
}

function FETCH_MARKET_ITEMS_REQUEST(nextState) {
  nextState.isLoading = true;
}

const reducer = createReducer(
  {
    entities: [],
    isLoading: false
  },
  {
    FETCH_MARKET_ITEMS_SUCCESS,
    FETCH_MARKET_ITEMS_FAILURE,
    FETCH_MARKET_ITEMS_REQUEST
  }
);

export default reducer;
