import C from '../constants';
import Firebase from 'firebase';

const fireRef = new Firebase(C.FIREBASE_URI);

export const listenToAuth = () => {
	return (dispatch, getState) => {
		fireRef.onAuth((authData) => {
			if (authData) {
				dispatch({
					type: C.AUTH_LOGIN,
					uid: authData.uid,
					username: authData.facebook.displayName || authData.facebook.username
				});
			} else {
				if (getState().auth.status !== C.AUTH_ANONYMOUS) {
					dispatch({ type: C.AUTH_LOGOUT });
				}
			}
		});
	};
};

export const openAuth = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_OPEN });
		fireRef.authWithOAuthPopup('facebook', (error) => {
			if (error) {
				dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Login failed! ${error}` });
				dispatch({ type: C.AUTH_LOGOUT });
			}
		});
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_LOGOUT });
		fireRef.unauth();
	};
};
