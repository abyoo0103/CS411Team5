import React, { Component } from 'react';
import styles from './index.less';
import TopBar from '../../components/TopBar';
import { Row, Col, Avatar, Tabs } from 'antd';
import articles from '../Home/articles';

const imgUrl = require('../../assets/images/img.jpg');
const { TabPane } = Tabs;

// 个人中心和作者主页通用一个界面
// same personal page for author and user
class Author extends Component {
  constructor() {
    super();
    this.state = {
      articles: articles, //文章列表
      attentions: [1, 1, 1, 1], //关注的人
    };
  }

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
    const { articles, attentions } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopBar></TopBar>
        <div className={styles.author}>
          <Row align="middle" style={{ marginBottom: '20px' }}>
            <Col span={3}>
              <Avatar size={80} src={imgUrl} />
            </Col>
            <Col>
              <div className={styles.authorName}>dsadasffashfas</div>
              <div className={styles.authorData}>
                <span>articles 100</span>|<span>attentions 100</span>|<span>fans 100</span>
              </div>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" style={{ width: '960px' }}>
            <TabPane tab="articles" key="1">
              {articles && articles.map(article => this.article(article))}
            </TabPane>
            <TabPane tab="followers" key="2">
              {attentions &&
                attentions.map(attention => (
                  <Row align="middle" className={styles.attention}>
                    <Col span={2}>
                      <Avatar size={60} src={imgUrl} />
                    </Col>
                    <Col>
                      <div
                        className={styles.name}
                        onClick={() => this.props.history.push(`/author/${14}`)}
                      >
                        follower
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

export default Author;
