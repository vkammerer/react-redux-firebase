import C from '../constants';
import Firebase from 'firebase';

const articlesRef = new Firebase(C.FIREBASE_URI).child('articles');

export const listenToArticles = () => {
	return (dispatch) => {
		articlesRef.on('value', (snapshot) => {
			dispatch({ type: C.ARTICLES_RECEIVE_DATA, data: snapshot.val() });
		});
	};
};

export const submitArticle = (content) => {
	return (dispatch, getState) => {
		const state = getState();
		const article = {
			content,
			username: state.auth.username,
			uid: state.auth.uid
		};
		dispatch({ type: C.ARTICLE_AWAIT_CREATION_RESPONSE });
		articlesRef.push(article, (error) => {
			dispatch({ type: C.ARTICLE_RECEIVE_CREATION_RESPONSE });
			if (error) {
				dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Submission failed! ${error}` });
			} else {
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Submission successfully saved!'
				});
			}
		});
	};
};

export const startArticleEdit = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.ARTICLE_EDIT, qid });
	};
};

export const cancelArticleEdit = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });
	};
};

export const submitArticleEdit = (qid, content) => {
	return (dispatch, getState) => {
		const state = getState();
		const article = {
			content,
			username: state.auth.username,
			uid: state.auth.uid
		};
		dispatch({ type: C.ARTICLE_EDIT_SUBMIT, qid });
		articlesRef.child(qid).set(article, (error) => {
			dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });
			if (error) {
				dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Update failed! ${error}` });
			} else {
				dispatch({ type: C.FEEDBACK_DISPLAY_MESSAGE, message: 'Update successfully saved!' });
			}
		});
	};
};
export const deleteArticle = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.ARTICLE_EDIT_SUBMIT, qid });
		articlesRef.child(qid).remove((error) => {
			dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });
			if (error) {
				dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Deletion failed! ${error}` });
			} else {
				dispatch({ type: C.FEEDBACK_DISPLAY_MESSAGE, message: 'Article successfully deleted!' });
			}
		});
	};
};
