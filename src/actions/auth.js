import C from '../constants';
import Firebase from 'firebase';

const fireRef = new Firebase(C.FIREBASE);

const authActions = {
	startListeningToAuth() {
		return (dispatch, getState) => {
			fireRef.onAuth((authData) => {
				if (authData) {
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.facebook.displayName || authData.facebook.username
					});
				} else {
					if (getState().auth.currently !== C.ANONYMOUS) {
						dispatch({ type: C.LOGOUT });
					}
				}
			});
		};
	},
	attemptLogin() {
		return (dispatch) => {
			dispatch({ type: C.ATTEMPTING_LOGIN });
			fireRef.authWithOAuthPopup('facebook', (error) => {
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Login failed! ' + error });
					dispatch({ type: C.LOGOUT });
				}
			});
		};
	},
	logoutUser() {
		return (dispatch) => {
			dispatch({ type: C.LOGOUT });
			fireRef.unauth();
		};
	}
};

export default authActions;
