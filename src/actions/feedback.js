import C from "../constants";

export const dismissFeedback = num => dispatch =>
  dispatch({ type: C.FEEDBACK_DISMISS, num });
