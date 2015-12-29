/*
This is the initial state of the Redux Store.
*/

import C from '../constants';

export default {
	feedback: [],
	auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
	articles: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // articles UI state
		data: {} // articles data
	}
};
