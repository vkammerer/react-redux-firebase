import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import C from '../../constants';

let mapStateToProps = function(appState){
	return {feedback:appState.feedback};
};

let mapDispatchToProps = (dispatch) => {
	return {
		dismissFeedback(n){ dispatch(actions.dismissFeedback(n)); }
	}
};

class Feedbackpanel extends Component {
	render(){
		let p = this.props;
		let rows = p.feedback.map((f,n) => {
			return (
				<div key={n} className={'feedback'+(f.error?' error':'')}>
					{f.msg}
					<button onClick={p.dismissFeedback.bind(this,n)}>X</button>
				</div>
			);
		});
		return (
			<div className='feedbacklist'>
				{rows}
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Feedbackpanel);
