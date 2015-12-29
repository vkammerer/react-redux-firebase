import { combineReducers } from 'redux';
import authReducer from './auth';
import feedbackReducer from './feedback';
import articlesReducer from './articles';

const rootReducer = combineReducers({
	auth: authReducer,
	feedback: feedbackReducer,
	articles: articlesReducer
});

export default rootReducer;
