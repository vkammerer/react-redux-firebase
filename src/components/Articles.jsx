import React, { Component } from "react";
import { connect } from "react-redux";
import {
  startArticleEdit,
  cancelArticleEdit,
  submitArticleEdit,
  deleteArticle
} from "../actions/articles";
import Article from "./Article";

class Articles extends Component {
  render() {
    const articlesList = Object.keys(this.props.articles.data).map(qid => {
      const article = this.props.articles.data[qid];
      const status = this.props.articles.status[qid];
      const thisStartArticleEdit = () => this.props.startArticleEdit(qid);
      const thisCancelArticleEdit = () => this.props.cancelArticleEdit(qid);
      const thisSubmitArticleEdit = value =>
        this.props.submitArticleEdit(qid, value);
      const thisDeleteArticle = () => this.props.deleteArticle(qid);
      return (
        <Article
          key={qid}
          qid={qid}
          article={article}
          status={status}
          canEdit={this.props.auth.uid === article.uid}
          startArticleEdit={thisStartArticleEdit}
          cancelArticleEdit={thisCancelArticleEdit}
          submitArticleEdit={thisSubmitArticleEdit}
          deleteArticle={thisDeleteArticle}
        />
      );
    });
    const articlesListOrLoading = this.props.articles.hasReceivedData
      ? articlesList
      : "Loading articles...";
    return (
      <div>
        {this.props.articles.errorMessage
          ? this.props.articles.errorMessage
          : articlesListOrLoading}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  auth: state.auth
});

const mapDispatchToProps = {
  startArticleEdit,
  cancelArticleEdit,
  submitArticleEdit,
  deleteArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
