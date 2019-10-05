import createReducer from 'model/store/createReducer';

function SHOW_SNACKBAR(nextState, { notification }) {
  nextState.list.push(notification);
}

function REMOVE_SNACKBAR(nextState, { key }) {
  nextState.list = nextState.list.filter(notif => notif.key !== key);
}

const reducer = createReducer(
  { list: [] },
  {
    SHOW_SNACKBAR,
    REMOVE_SNACKBAR
  }
);

export default reducer;
