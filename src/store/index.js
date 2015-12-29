/*
This file defines the main Redux Store. It is used by the app index.js file where it is given to
the Provider element from ReactRedux, which allows smart components to `connect` to the store
*/

import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import initialState from './initialstate';
import thunk from 'redux-thunk';

// A super-simple logger
const logger = (store) => (next) => (action) => {
	console.log('dispatching', action.type,action)
	var result = next(action)
	console.log('next state', store.getState())
	return result
}

export default applyMiddleware(thunk,logger)(createStore)(rootReducer,initialState);
