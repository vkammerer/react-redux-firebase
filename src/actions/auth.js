import C from '../constants';
import Firebase from 'firebase';

const fireRef = new Firebase(C.FIREBASE);

const authActions = {
	startListeningToAuth(){
		return (dispatch,getState) => {
			fireRef.onAuth((authData) => {
				if (authData){
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.facebook.displayName || authData.facebook.username
					});
				} else {
					if (getState().auth.currently !== C.ANONYMOUS){ // log out if not already logged out
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	},
	attemptLogin(){
		return (dispatch,getState) => {
			dispatch({type:C.ATTEMPTING_LOGIN});
			fireRef.authWithOAuthPopup('facebook', (error, authData) => {
				if (error) {
					dispatch({type:C.DISPLAY_ERROR,error:'Login failed! '+error});
					dispatch({type:C.LOGOUT});
				} else {
					// no need to do anything here, startListeningToAuth have already made sure that we update on changes
				}
			});
		}
	},
	logoutUser(){
		return (dispatch,getState) => {
			dispatch({type:C.LOGOUT}); // don't really need to do this, but nice to get immediate feedback
			fireRef.unauth();
		}
	}
};

export default authActions;
