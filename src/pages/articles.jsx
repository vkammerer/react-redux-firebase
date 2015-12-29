import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authpanel from './components/authpanel';
import C from '../constants';
import actions from '../actions';
import Article from './components/article';

export default class Articles extends Component {
  constructor(){
    super()
    this.newArticle = this.newArticle.bind(this)
  }
  newArticle(e){
		if (!this.props.articles.submitting){
			e.preventDefault();
			this.props.submitNewArticle(this.refs.newarticle.value);
			this.refs.newarticle.value = '';
		}
	}
	render(){
		let p = this.props;
    let rows = Object.keys(p.articles.data).map((qid) => {
      let article = p.articles.data[qid];
			let articlestate = p.articles.states[qid];
			return <Article
				key={qid}
				article={article}
				qid={qid}
				state={articlestate}
				edit={p.startEdit.bind(this,qid)}
				cancel={p.cancelEdit.bind(this,qid)}
				submit={p.submitEdit.bind(this,qid)}
				delete={p.deleteArticle.bind(this,qid)}
				mayedit={p.auth.uid === article.uid}
			/>;
		});
		return (
      <div className='articleslist'>
  			{p.auth.uid ? <form onSubmit={this.newArticle}>
  				<input ref='newarticle' placeholder='write something clever!'/>
  				<button type='submit' disabled={p.articles.submittingnew}>{p.articles.submittingnew ? 'Submitting...' : 'Submit'}</button>
  			</form> : <p>Log in to add a new article of your own!</p>}
  			{p.articles.hasreceiveddata ? rows : 'Loading articles...'}
  		</div>
    );
  }
}

let mapStateToProps = (appState) => {
	return {
		articles: appState.articles,
		auth: appState.auth
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		submitNewArticle(content){ dispatch(actions.submitNewArticle(content)); },
		startEdit(qid){ dispatch(actions.startArticleEdit(qid)); },
		cancelEdit(qid){ dispatch(actions.cancelArticleEdit(qid)); },
		submitEdit(qid,content){ dispatch(actions.submitArticleEdit(qid,content)); },
		deleteArticle(qid){ dispatch(actions.deleteArticle(qid)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Articles);
