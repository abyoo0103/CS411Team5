import React, { Component } from 'react';
import styles from './index.less';
import { Input } from 'antd';
import TopBar from '@/components/TopBar';

const { Search } = Input;

const imgUrl = require('@/assets/images/img.jpg');
let count = 0; //滚动初始位置
const num = 6; //滚动幅度

class Index extends Component {
  constructor() {
    super();
    this.state = {
      recommands: [1, 21, 2, 21, 21, 2, 7, 7, 7, 7, 7, 77, 1, 21], //推荐的文件列表
    };
  }
  componentDidMount() {
    count = 0; //初始化滚动位置
  }

  /**
   * 主页大搜索框搜索事件
   * @param value string 输入的值
   */
  onSearch = value => {
    this.props.history.push('./result?keywords=' + value); //所有的history.push皆为跳转页面
  };

  /**
   * 推荐文章滚动
   * @param type string 滚动方向 left right
   */
  scrollTo = type => {
    let elmnt;
    if (type === 'left' && count >= num) {
      count -= num;
    } else if (type === 'right' && count < this.state.recommands.length - num) {
      count += num;
    }
    elmnt = document.getElementById(count);
    elmnt.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  render() {
    const { recommands } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopBar isTransparent={true} />
        <div className={styles.contentBox}>
          <div className={styles.title}>A Good Paper&nbsp;&nbsp;&nbsp;&nbsp;Welcome To YISHOU</div>
          <Search className={styles.search} size="large" onSearch={this.onSearch}></Search>
        </div>
        {window.$isLogin && (
          <nav className={styles.recommands}>
            <img
              src={require('@/assets/icons/icon_left.png')}
              alt=""
              onClick={() => this.scrollTo('left')}
            />
            <div
              className={styles.recommandList}
              id="scrollContent"
              onClick={() => this.props.history.push('/detail/50')}
            >
              {recommands &&
                recommands.map((recommand, index) => (
                  <div id={index} className={styles.recommand}>
                    <img src={imgUrl} alt="" />
                    <p>{index + '/' + recommand}</p>
                  </div>
                ))}
            </div>
            <img
              src={require('@/assets/icons/icon_left.png')}
              alt=""
              onClick={() => this.scrollTo('right')}
            />
          </nav>
        )}
      </div>
    );
  }
}

export default Index;
