import C from '../../constants';
import initialState from '../initialstate';

export default (currentfeedback, action) => {
	switch (action.type) {
		case C.DISMISS_FEEDBACK:
			return currentfeedback.filter((i, n) => n !== action.num);
		case C.DISPLAY_ERROR:
			return currentfeedback.concat({ msg: action.error, error: true });
		case C.DISPLAY_MESSAGE:
			return currentfeedback.concat({ msg: action.message, error: false });
		default: return currentfeedback || initialState.feedback;
	}
};
