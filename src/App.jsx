import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { listenToAuth } from './actions/auth';
import { listenToArticles } from './actions/articles';
import Page from './components/Page';

export class App extends Component {
	componentWillMount() {
		store.dispatch(listenToAuth());
		store.dispatch(listenToArticles());
	}
	render() {
		return (
			<Provider store={store}>
				<Page />
			</Provider>
		);
	}
}
