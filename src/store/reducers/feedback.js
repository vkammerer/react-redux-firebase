import C from '../../constants';

const initialState = [];

export default (state, action) => {
	switch (action.type) {
		case C.FEEDBACK_DISMISS:
			return state.filter((i, n) => n !== action.num);
		case C.FEEDBACK_DISPLAY_ERROR:
			return state.concat({ msg: action.error, error: true });
		case C.FEEDBACK_DISPLAY_MESSAGE:
			return state.concat({ msg: action.message, error: false });
		default: return state || initialState;
	}
};
