import C from '../../constants';
import initialState from '../initialstate';

export default (currentstate, action) => {
	let newstate;
	switch (action.type) {
		case C.RECEIVE_ARTICLES_DATA:
			return Object.assign({}, currentstate, {
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_ARTICLE_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: true
			});
		case C.RECEIVE_NEW_ARTICLE_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: false
			});
		case C.START_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.EDITING_ARTICLE;
			return newstate;
		case C.FINISH_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.SUBMITTING_ARTICLE;
			return newstate;
		default: return currentstate || initialState.articles;
	}
};
