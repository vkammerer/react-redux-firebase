/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

import React, { Component } from 'react';
import Authpanel from './components/authpanel';
import Feedbackpanel from './components/feedbackpanel';

export default class Wrapper extends Component {
	render() {
		return (
			<div className="wrapper">
				<Authpanel />
				<div className="center">
					<Feedbackpanel />
					{this.props.children}
				</div>
			</div>
		);
	}
}
