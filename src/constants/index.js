import articles from "./articles";
import auth from "./auth";
import feedback from "./feedback";
import firebase from "./firebase";

export default {
  ...articles,
  ...auth,
  ...feedback,
  ...firebase
};
