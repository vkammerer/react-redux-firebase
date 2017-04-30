import * as firebase from "firebase";
import C from "../constants";
import { auth } from "../firebaseApp";
import { listenToArticles } from "./articles";

export const listenToAuth = () => {
  return (dispatch, getState) => {
    auth.onAuthStateChanged(authData => {
      if (authData) {
        dispatch({
          type: C.AUTH_LOGIN,
          uid: authData.uid,
          username: authData.providerData[0].displayName
        });

        // reload articles on auth update.
        const listenToArticlesDispatcher = listenToArticles();
        listenToArticlesDispatcher(dispatch, getState);
      } else {
        if (getState().auth.status !== C.AUTH_ANONYMOUS) {
          dispatch({ type: C.AUTH_LOGOUT });
        }
      }
    });
  };
};

export const openAuth = () => {
  return dispatch => {
    dispatch({ type: C.AUTH_OPEN });
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).catch(error => {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Login failed! ${error}`
      });
      dispatch({ type: C.AUTH_LOGOUT });
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: C.AUTH_LOGOUT });
    auth.signOut();
  };
};
