import C from '../../constants';

const initialState = {
	hasReceivedData: false,
	submittingNew: false,
	errorMessage: '',
	data: {},
	status: {},
};

export default (state, action) => {
	let newstate;
	switch (action.type) {
		case C.ARTICLES_RECEIVE_DATA:
			return Object.assign({}, state, {
				hasReceivedData: true,
				data: action.data,
				errorMessage: ''
			});
		case C.ARTICLES_RECEIVE_DATA_ERROR:
			return Object.assign({}, state, {
				data: null,
				errorMessage: action.message
			});
		case C.ARTICLE_AWAIT_CREATION_RESPONSE:
			return Object.assign({}, state, {
				submittingNew: true
			});
		case C.ARTICLE_RECEIVE_CREATION_RESPONSE:
			return Object.assign({}, state, {
				submittingNew: false
			});
		case C.ARTICLE_EDIT:
			newstate = Object.assign({}, state);
			newstate.status[action.qid] = C.ARTICLE_EDITING;
			return newstate;
		case C.ARTICLE_EDIT_FINISH:
			newstate = Object.assign({}, state);
			delete newstate.status[action.qid];
			return newstate;
		case C.ARTICLE_EDIT_SUBMIT:
			newstate = Object.assign({}, state);
			newstate.status[action.qid] = C.ARTICLE_SUBMITTING;
			return newstate;
		default: return state || initialState;
	}
};
