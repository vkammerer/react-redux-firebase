import C from '../constants';

export const dismissFeedback = (num) => {
  return (dispatch) => {
    dispatch({ type: C.FEEDBACK_DISMISS, num });
  };
};
