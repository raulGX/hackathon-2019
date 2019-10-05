import { combineReducers } from 'redux';
// import Cookie from 'js-cookie';

import userReducer from './user';
import notificationsReducer from './notifications';
import eventsReducer from './events';

const reducers = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  events: eventsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // Cookie.remove(COOKIE_NAME, { path, domain });
    // reset store to initial values
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;
