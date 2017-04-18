import { combineReducers } from 'redux';
import articles from './articles';
import auth from './auth';
import feedback from './feedback';

const rootReducer = combineReducers({
  articles,
  auth,
  feedback,
});

export default rootReducer;
