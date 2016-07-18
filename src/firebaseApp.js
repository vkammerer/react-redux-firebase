import C from './constants';
import * as firebase from 'firebase';

firebase.initializeApp(C.firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
// export const storage = firebase.storage();
