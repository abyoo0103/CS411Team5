import React, { Component } from 'react';
import TopBar from '@/components/TopBar';
import styles from './index.less';
//import articles from './articles';
import { Button, Row, Col, Avatar } from 'antd';

const imgUrl = require('../../assets/images/img.jpg');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], //文章列表
      authors: [], //作者列表
      recommends: [],
      browsingHistory: [], //浏览记录列表
    };
  }

  /**
   * 跳转详情页
   * @param id string 文章id
   */
  toDetail = id => {
    this.props.history.push(`/detail/${id}`);
  };

  /**
   * 函数式组件，文章组件
   * article component
   * @param article object 文章详情，
   * 字段为api对应字段，可以修改
   */
  article = article => {
    const commentUrl = require('../../assets/icons/icon_comment.png');
    const likeUrl = require('../../assets/icons/icon_like.png');
    return (
      <div className={styles.article} key={article.id}>
        <div className={styles.articleContent}>
          <div className={styles.articleTitle} onClick={() => this.toDetail(article.paper_id)}>
            {article.title}
          </div>
          <div className={styles.articleData}>
            <span>
              <img src={commentUrl} alt="" />
              <span>{'0'}</span>
            </span>
            <span>
              <img src={likeUrl} alt="" />
              <span>{'0'}</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount(){
      this.getAuthors();
      this.getRecommendation();
  } 

  getAuthors = _ => {
      const url = `http://localhost:3001/authors`;
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(response => {
          console.log('json:',response)
          var key = Object.keys(response)
          for(var i = 0; i < key.length; i++){
          this.setState({authors:[...this.state.authors, response[key[i]]]})
		  }
          console.log('array数组2:',this.state.authors)
          })
        .catch(err => console.error('err',err));
  }

  /*
  * Inserts new row into Follow account (assumes username and author_id exists)
  */
  followAuthor = index => {
    const username = localStorage.getItem('usernameLocalStorage');
    const { authors } = this.state;
    const id = authors[index].author_id;
    console.log('index is', id);
    const url = `http://localhost:3001/follows/insert?username=${username}&author_id=${id}`;
    return fetch(url).then(response => response.json()).catch(err => console.error(err));
  }

  /*
  * Deletes row from Follow account (assumes username and author_id exists)
  */
  unfollowAuthor = index => {
    const username = localStorage.getItem('usernameLocalStorage');
    const { authors } = this.state;
    const id = authors[index].id;
    const url = `http://localhost:3001/follows/delete?username=${username}&author_id=${id}`;
    return fetch(url).then(response => response.json()).catch(err => console.error(err));
  }

  
  getRecommendation = _ => {
    const username = localStorage.getItem('usernameLocalStorage');
    const url = `http://localhost:3001/recommendations/select?username=${username}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log('json:',response)
        var key = Object.keys(response)
        // this.state.following.push(response[key]['name'])
        for(var i = 0; i < key.length; i++){
          this.setState({articles:[...this.state.articles, response[key[i]]]})
        }
        console.log('array数组2:',this.state.articles)
        })
      .catch(err => console.error('错误:',err));
  }
  /**
   * 修改推荐作者的关注状态
   * @param index number 需要修改的作者在列表的下标
   */
  changeAttentionStatus = index => {
    if (window.$isLogin) {
      const { authors } = this.state;
      authors[index].isAttention = !authors[index].isAttention;
      if (authors[index].isAttention){
        this.followAuthor(index);
	  }
      else{
       this.unfollowAuthor(index);
	  }
      this.setState({ authors });
    } else {
      this.topBarRef.sign(1);
    }
  };

  /**
   * 函数式组件，作者组件
   * @param author object 作者详情，
   * @param index number 列表对应下标
   * 字段为api对应字段，可以修改
   */
  author = (author, index) => {
    return (
      <Row justify="space-between" align="middle" className={styles.author}>
        <Col flex={1}>
          <Row align="middle">
            <Col span={5}>
              <Avatar size={32} src={imgUrl} />
            </Col>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.history.push('/author/' + author.author_id)}
            >
              <div className={styles.authorName}>{author.name}</div>
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Button
            type="link"
            style={author.isAttention ? { color: 'green' } : {}}
            onClick={() => this.changeAttentionStatus(index)}
          >
            {!author.isAttention ? '+Attention' : 'Focused'}{' '}
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    const { articles, authors, browsingHistory, recommends} = this.state;
    // const isResult = this.props.match.path.includes('result') ? true : false;
    const isLogin = window.$isLogin;
    return (
      <div className={styles.wrapper}>
        <TopBar
          wrappedComponentRef={c => {
            this.topBarRef = c;
          }}
        />
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            {articles && articles.map(articles => this.article(articles))}
            <Button className={styles.more}>Read More</Button>
          </div>
          <div className={styles.containerRight}>
            <Row justify="space-between" align="middle">
              <Col>
                <span>Recommend Authors</span>
              </Col>
              <Col>
                <Button type="link">Change</Button>
              </Col>
            </Row>
            <div>{authors && authors.map((author, index) => this.author(author, index))}</div>
            <Button type="default" className={styles.all}>
              Looking All
            </Button>
            {isLogin && (
              <React.Fragment>
                <Row justify="space-between" align="middle" style={{ marginTop: '40px' }}>
                  <Col>
                    <span>BrowsingHistory</span>
                  </Col>
                </Row>
                <div>
                  {browsingHistory && //这里应该用浏览记录的列表
                    browsingHistory.map(history => (
                      <div
                        className={styles.history}
                        onClick={() => this.props.history.push('/detail/67')}
                      >
                        BrowsingHistory here
                      </div>
                    ))}
                </div>
                <Button type="default" className={styles.all} style={{ marginTop: '16px' }}>
                  Looking All
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
