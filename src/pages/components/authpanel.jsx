import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import C from '../../constants';

const mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptLogin() { dispatch(actions.attemptLogin()); },
		logoutUser() { dispatch(actions.logoutUser()); }
	};
};

class Authpanel extends Component {
	render() {
		const p = this.props;
		switch (p.auth.currently) {
			case C.LOGGED_IN: return (
				<div className="authpanel">
					<span>Logged in as {p.auth.username}.</span>
					{" "}<button onClick={p.logoutUser}>Log out</button>
				</div>
			);
			case C.AWAITING_AUTH_RESPONSE: return (
				<div className="authpanel">
					<button disabled>authenticating...</button>
				</div>
			);
			default: return (
				<div className="authpanel">
					<button onClick={p.attemptLogin}>Log in</button>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Authpanel);
