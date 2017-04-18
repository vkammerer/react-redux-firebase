import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dismissFeedback } from '../actions/feedback';

const Feedback = props => {
	const rows = props.feedback.map((f, n) => {
		return (
			<div key={n} className={`feedback${f.error ? ' error' : ''}`}>
				{f.msg}
				<button onClick={() => props.dismissFeedback(n)}>X</button>
			</div>
		);
	});
	return (
		<div>
			{rows}
		</div>
	);
};

const mapStateToProps = state => ({ feedback: state.feedback });

const mapDispatchToProps = { dismissFeedback };

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
