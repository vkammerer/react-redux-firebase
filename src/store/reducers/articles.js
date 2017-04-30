import C from "../../constants";

const initialState = {
  hasReceivedData: false,
  submittingNew: false,
  errorMessage: "",
  data: {},
  status: {}
};

export default (state, action) => {
  let newState;
  switch (action.type) {
    case C.ARTICLES_RECEIVE_DATA:
      return {
        ...state,
        hasReceivedData: true,
        data: action.data,
        errorMessage: ""
      };
    case C.ARTICLES_RECEIVE_DATA_ERROR:
      return {
        ...state,
        data: null,
        errorMessage: action.message
      };
    case C.ARTICLE_AWAIT_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: true
      };
    case C.ARTICLE_RECEIVE_CREATION_RESPONSE:
      return {
        ...state,
        submittingNew: false
      };
    case C.ARTICLE_EDIT:
      newState = { ...state };
      newState.status[action.qid] = C.ARTICLE_EDITING;
      return newState;
    case C.ARTICLE_EDIT_FINISH:
      newState = { ...state };
      delete newState.status[action.qid];
      return newState;
    case C.ARTICLE_EDIT_SUBMIT:
      newState = { ...state };
      newState.status[action.qid] = C.ARTICLE_SUBMITTING;
      return newState;
    default:
      return state || initialState;
  }
};
