import uuidv1 from 'uuid/v1';
import createReducer from 'model/store/createReducer';

function SHOW_SNACKBAR(nextState, { notification }) {
  nextState.list.push(notification);
}

function REMOVE_SNACKBAR(nextState, { key }) {
  nextState.list = nextState.list.filter(notif => notif.key !== key);
}

// show notification shen event ends - received notification
function MODIFY_EVENT(nextState, { payload }) {
  if (payload.finished) {
    nextState.list.push({
      key: uuidv1(),
      message: `Event ${payload.name} has ended. You have received ${payload.rewardCredits} coins.`,
      options: {
        variant: 'success',
        persist: true
      }
    });
  }
}

const reducer = createReducer(
  { list: [] },
  {
    SHOW_SNACKBAR,
    REMOVE_SNACKBAR,
    '@@backend/EVENT_STATUS_MODIFIED': MODIFY_EVENT
  }
);

export default reducer;
