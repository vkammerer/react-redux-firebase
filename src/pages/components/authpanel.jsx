import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from '../../actions';
import C from '../../constants';

let mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

let mapDispatchToProps = (dispatch) => {
	return {
		attemptLogin(){ dispatch(actions.attemptLogin()); },
		logoutUser(){ dispatch(actions.logoutUser()); }
	}
};

class Authpanel extends Component {
	render() {
		let p = this.props;
		let authContent;
		switch(p.auth.currently){
			case C.LOGGED_IN: return(
				<div className='authpanel'>
					<span>Logged in as {p.auth.username}.</span>
					{' '}<button onClick={p.logoutUser}>Log out</button>
				</div>
			)
			case C.AWAITING_AUTH_RESPONSE: return(
				<div className='authpanel'>
					<button disabled>authenticating...</button>
				</div>
			)
			default: return(
				<div className='authpanel'>
					<button onClick={p.attemptLogin}>Log in</button>
				</div>
			)
		}
		return (
			<div className='authpanel'>
				{authContent}
			</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Authpanel);
