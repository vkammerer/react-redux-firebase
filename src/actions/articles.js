import C from "../constants";
import { database } from "../firebaseApp";

const articlesRef = database.ref("articles");

export const listenToArticles = () => dispatch =>
  articlesRef.on(
    "value",
    snapshot =>
      dispatch({
        type: C.ARTICLES_RECEIVE_DATA,
        data: snapshot.val()
      }),
    error =>
      dispatch({
        type: C.ARTICLES_RECEIVE_DATA_ERROR,
        message: error.message
      })
  );

export const submitArticle = content => (dispatch, getState) => {
  const state = getState();
  const article = {
    content,
    username: state.auth.username,
    uid: state.auth.uid
  };
  dispatch({ type: C.ARTICLE_AWAIT_CREATION_RESPONSE });
  articlesRef.push(article, error => {
    dispatch({ type: C.ARTICLE_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Article submission failed! ${error}`
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: "Article successfully saved!"
      });
    }
  });
};

export const startArticleEdit = qid => dispatch =>
  dispatch({ type: C.ARTICLE_EDIT, qid });

export const cancelArticleEdit = qid => dispatch =>
  dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });

export const submitArticleEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const article = {
    content,
    username: state.auth.username,
    uid: state.auth.uid
  };
  dispatch({ type: C.ARTICLE_EDIT_SUBMIT, qid });
  articlesRef.child(qid).set(article, error => {
    dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Article update failed! ${error}`
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: "Article successfully updated!"
      });
    }
  });
};

export const deleteArticle = qid => dispatch => {
  dispatch({ type: C.ARTICLE_EDIT_SUBMIT, qid });
  articlesRef.child(qid).remove(error => {
    dispatch({ type: C.ARTICLE_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Article deletion failed! ${error}`
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: "Article successfully deleted!"
      });
    }
  });
};
