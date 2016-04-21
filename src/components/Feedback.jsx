import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dismissFeedback } from '../actions/feedback';

class Feedback extends Component {
	constructor(props) {
		super(props);
		this.dismissFeedback = this.props.dismissFeedback.bind(this);
	}
	render() {
		const rows = this.props.feedback.map((f, n) => {
			return (
				<div key={n} className={`feedback${f.error ? ' error' : ''}`}>
					{f.msg}
					<button onClick={() => this.dismissFeedback(n)}>X</button>
				</div>
			);
		});
		return (
			<div>
				{rows}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { feedback: state.feedback };
};

const mapDispatchToProps = { dismissFeedback };

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
