import React, { Component } from 'react';
import styles from './index.less';
import TopBar from '@/components/TopBar';
import { Row, Col, Avatar } from 'antd';
import detail from './detail';

const imgUrl = require('../../assets/images/img.jpg');

class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      detail: detail, //文章详情
    };
  }
  render() {
    const { detail } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopBar />
        <div className={styles.detail}>
          <div className={styles.detailLeft}>
            <div className={styles.title}>{detail.title}</div>
            <Row className={styles.author} align="middle">
              <Col span={2}>
                <Avatar size={32} src={imgUrl} />
              </Col>
              <Col>
                <div
                  className={styles.authorName}
                  onClick={() => this.props.history.push('/author/' + detail.author.id)}
                >
                  {detail.author.name}
                </div>
                <div className={styles.authorInfo}>
                  <span>{detail.create_time}</span>
                  <span>words:{detail.length}</span>
                  <span>reads:{detail.readCount}</span>
                </div>
              </Col>
            </Row>
            <div className={styles.detailContent}>{detail.content}</div>
          </div>
          <div className={styles.recommend}>
            <div className={styles.header}>Recommended Reading</div>
            {detail.recommends &&
              detail.recommends.map((recommend, index) => (
                <div>
                  <div
                    className={styles.recommendTitle}
                    onClick={() => this.props.history.push(`/detail/${index}`)}
                  >
                    {recommend.title}
                  </div>
                  <div className={styles.recommendNum}>reads:{recommend.readCount}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetail;
