import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle
} from '../actions/articles';
import Article from './Article';

class Articles extends Component {
	submitNewArticle = e => {
		if (!this.props.articles.submitting) {
			e.preventDefault();
			if (this.refs.newArticle.value) {
				this.props.submitArticle(this.refs.newArticle.value);
			}
			this.refs.newArticle.value = '';
		}
	}
	render() {
		let rows = [];
		if (this.props.articles.data) {
			rows = Object.keys(this.props.articles.data).map((qid) => {
				const article = this.props.articles.data[qid];
				const status = this.props.articles.status[qid];
				const thisStartArticleEdit = () => this.props.startArticleEdit(qid);
				const thisCancelArticleEdit = () => this.props.cancelArticleEdit(qid);
				const thisSubmitArticleEdit = (value) => this.props.submitArticleEdit(qid, value);
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
		}
		let content;
		if (this.props.auth.uid) {
			content = (
				<div>
					<form onSubmit={this.submitNewArticle}>
						<input ref="newArticle" placeholder="write something clever!" />
						<button type="submit" disabled={this.props.articles.submittingNew}>
							{this.props.articles.submittingNew ? 'Submitting...' : 'Submit'}
						</button>
					</form>
				</div>
			);
		} else {
			content = <p>Log in to add a new article of your own!</p>;
		}
		const rowsOrLoading = this.props.articles.hasReceivedData
			? rows
			: 'Loading articles...';
		return (
			<div>
				{content}
				{this.props.articles.errorMessage
					? <p>{this.props.articles.errorMessage}</p>
					: rowsOrLoading
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	articles: state.articles,
	auth: state.auth
});

const mapDispatchToProps = {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
