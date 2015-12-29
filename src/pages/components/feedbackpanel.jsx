import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

const mapStateToProps = (appState) => {
	return { feedback: appState.feedback };
};

const mapDispatchToProps = (dispatch) => {
	return {
		dismissFeedback(n) { dispatch(actions.dismissFeedback(n)); }
	};
};

class Feedbackpanel extends Component {
	render() {
		const p = this.props;
		const rows = p.feedback.map((f, n) => {
			return (
				<div key={n} className={'feedback' + (f.error ? ' error' : '')}>
					{f.msg}
					<button onClick={p.dismissFeedback.bind(this, n)}>X</button>
				</div>
			);
		});
		return (
			<div className="feedbacklist">
				{rows}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedbackpanel);
