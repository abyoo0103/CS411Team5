import React, { Component } from 'react';
import styles from './index.less';
import TopBar from '../../components/TopBar';
import { Row, Col, Avatar, Tabs } from 'antd';
import articles from '../Home/articles';

const imgUrl = require('../../assets/images/img.jpg');
const { TabPane } = Tabs;

// 个人中心和作者主页通用一个界面
// same personal page for author and user
class User extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('usernameLocalStorage'),
      articles: articles, //article list
      attentions: [1, 1, 1, 1], // Guanyu - following
      following: [] // List of author_ids
    };
  }

  componentDidMount(){
      this.name = localStorage.getItem('usernameLocalStorage');
      this.getFollowing();
  } 

  getFollowing = _ => {
      const username = localStorage.getItem('usernameLocalStorage');
      const url = `http://localhost:3001/accounts/following/?username=${username}`;
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(response => {
          console.log('json:',response)
          var key = Object.keys(response)
          // this.state.following.push(response[key]['name'])
          this.setState({following:[...this.state.following, response[key]['name']]})
          console.log('array数组2:',this.state.following)
          })
        .catch(err => console.error('err',err));
  }

  //getFollowingCount

  renderFollowing = ({author_id}) => <div key={author_id}> {author_id} </div>

  /**
   * 函数式组件，文章组件
   * @param article object 文章详情，
   * 字段为api对应字段，可以修改
   */
  article = article => {
    const commentUrl = require('../../assets/icons/icon_comment.png');
    const likeUrl = require('../../assets/icons/icon_like.png');
    return (
      <div className={styles.article} key={article.id}>
        <div className={styles.articleContent}>
          <div
            className={styles.articleTitle}
            onClick={() => this.props.history.push(`/detail/${article.id}`)}
          >
            {article.title}
          </div>
          <div className={styles.articleText}>{article.content}</div>
          <div className={styles.articleData}>
            <span>
              <img src={commentUrl} alt="" />
              <span>{article.comment}</span>
            </span>
            <span>
              <img src={likeUrl} alt="" />
              <span>{article.like}</span>
            </span>
          </div>
        </div>
        <img className={styles.articleImg} src={imgUrl} alt="" />
      </div>
    );
  };

  render() {
    const { articles, attentions, name, following } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopBar></TopBar>
        <div className={styles.author}>
          <Row align="middle" style={{ marginBottom: '20px' }}>
            <Col span={3}>
              <Avatar size={80} src={imgUrl} />
            </Col>
            <Col>
              <div className={styles.authorName}> {name} </div>
              <div className={styles.authorData}>
                <span>articles 100</span>|<span>attentions 100</span>|<span>fans 100</span>
              </div>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" style={{ width: '960px' }}>
            <TabPane tab="articles" key="1">
              {articles && articles.map(article => this.article(article))}
            </TabPane>
            <TabPane tab="following" key="2">
              {following &&
                following.map(following => (
                  <Row align="middle" className={styles.attention}>
                    <Col span={2}>
                      <Avatar size={60} src={imgUrl} />
                    </Col>
                    <Col>
                      <div
                        className={styles.name}
                        onClick={() => this.props.history.push(`/user/${14}`)}
                      >
                        {following}
                      </div>
                      <div className={styles.data}>
                        <span>id:dsadasdasda</span>|<span>articles:15145</span>
                      </div>
                    </Col>
                  </Row>
                ))}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default User;