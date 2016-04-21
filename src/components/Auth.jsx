import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openAuth, logoutUser } from '../actions/auth';
import C from '../constants';

class Auth extends Component {
	getJSX(props) {
		switch (props.auth.status) {
			case C.AUTH_LOGGED_IN: return (
				<div>
					<span>Logged in as {props.auth.username}.</span>
					{" "}<button onClick={props.logoutUser}>Log out</button>
				</div>
			);
			case C.AUTH_AWAITING_RESPONSE: return (
				<div>
					<button disabled>authenticating...</button>
				</div>
			);
			default: return (
				<div>
					<button onClick={props.openAuth}>Log in</button>
				</div>
			);
		}
	}
	render() {
		return this.getJSX(this.props);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

const mapDispatchToProps = {
	openAuth,
	logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
