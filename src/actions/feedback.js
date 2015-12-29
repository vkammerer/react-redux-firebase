import C from '../constants';

const feedbackActions = {
	dismissFeedback(num){
		return {type:C.DISMISS_FEEDBACK,num};
	}
};

export default feedbackActions;
