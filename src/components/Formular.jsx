import React, { Component } from "react";
import { connect } from "react-redux";
import { submitArticle } from "../actions/articles";

class Formular extends Component {
  submitNewArticle = e => {
    e.preventDefault();
    if (!this.props.articles.submitting) {
      if (this.refs.newArticle.value) {
        this.props.submitArticle(this.refs.newArticle.value);
      }
      this.refs.newArticle.value = "";
    }
  };
  render() {
    return this.props.auth.uid
      ? <form onSubmit={this.submitNewArticle}>
          <p>
            <input ref="newArticle" placeholder="write something clever!" />
            <button type="submit" disabled={this.props.articles.submittingNew}>
              {this.props.articles.submittingNew ? "Submitting..." : "Submit"}
            </button>
          </p>
        </form>
      : <p>Log in to add a new article of your own!</p>;
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  auth: state.auth
});

const mapDispatchToProps = { submitArticle };

export default connect(mapStateToProps, mapDispatchToProps)(Formular);
