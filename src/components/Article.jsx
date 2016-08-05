import React, { Component } from 'react';
import C from '../constants';

class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		e.preventDefault();
		this.props.submitArticleEdit(this.refs.article.value);
		this.refs.article.value = '';
	}
	render() {
		let button;
		if (this.props.status === C.ARTICLE_EDITING) {
			return (
				<form onSubmit={this.submit}>
					<input ref="article" defaultValue={this.props.article.content} />
					<button type="button" onClick={this.props.cancelArticleEdit}>Cancel</button>
					<button type="submit" onClick={this.submit}>Submit</button>
				</form>
			);
		}
		if (!this.props.canEdit) {
			button = '';
		} else if (this.props.status === C.ARTICLE_SUBMITTING) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = (
				<span>
					<button onClick={this.props.startArticleEdit}>Edit</button>
					<button onClick={this.props.deleteArticle}>Delete</button>
				</span>
			);
		}
		return (
			<div>
				<span>{`${this.props.article.username} said:`}</span>
				{this.props.article.content} {button}
			</div>
		);
	}
}

export default Article;
