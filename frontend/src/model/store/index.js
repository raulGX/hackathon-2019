import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'model/reducers';
import { api } from './middlewares';

function configureStore(initialState = {}) {
  const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware, api));
  const store = createStore(rootReducer, initialState, composedEnhancers);
  return store;
}

export default configureStore();
