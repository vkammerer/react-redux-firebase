import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer);
export default store;
