import React, { Component } from 'react';
import { Input, Button, Menu, Dropdown, Avatar, Icon, Modal, message } from 'antd';
import styles from './TopBar.less';
import { withRouter, Link } from 'react-router-dom';
import Sign from './Sign';

const { Search } = Input;

const logoUrl = require('@/assets/images/logo_1.png');
const imgUrl = require('@/assets/images/img.jpg');

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 1,
      signIn: {
        name: '',
        password: '',
      },
      signUp: {
        name: '',
        password: '',
        confirmPsw: '',
      },
      isLogin: window.$isLogin,
    };
  }
  search = value => {
    this.props.history.push('./result?keywords=' + value);
  };

  userAvatar = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/user">Personal</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/setting">Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <div
            onClick={() => {
              this.setState({ visible: false });
              window.$isLogin = false;
            }}
          >
            Sign Out
          </div>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <div>
          <Avatar src={imgUrl} size={42}></Avatar>
          <Icon type="down" />
        </div>
      </Dropdown>
    );
  };

  /**
   * input数据保存
   * get input value from signIn or signUp
   * @param type string 登录signIn  注册signUp
   * @param key string 对应的字段
   * @param value string 输入的值
   */
  inputValueChange = (type, key, value) => {
    const obj = this.state[type];
    console.log(obj);
    obj[key] = value.target.value;
    this.setState({
      [type]: obj,
    });
  };

  /**
   * 弹出登录注册modal
   * @param type number 需要弹出modal的类型 1登录 2注册
   */
  sign = type => {
    this.setState({
      visible: true,
      type,
    });
  };

  /**
   * 修改弹出类型
   * @param type number modal的类型 1登录 2注册
   */
  changeType = type => {
    this.setState({ type });
  };

  /**
   * 登录
   */
  login = () => {
    const { signIn } = this.state;
    if (!signIn.name || !signIn.password) {
      message.error('Please enter the correct email or password!');
      return;
    }
    this.setState({
      visible: false,
    });
    message.success('Login successful, welcome back');
    window.$isLogin = true;
    const url = this.props.location.pathname;
    this.props.history.replace(url);
  };

  /**
   * 注册
   */
  register = () => {
    const { signUp } = this.state;
    if (!signUp.name || !signUp.password || !signUp.confirmPsw) {
      message.error('Please enter the correct email or password!');
      return;
    }
    if (signUp.password !== signUp.confirmPsw) {
      message.error('The two passwords are different, please re-enter!');
      return;
    }
    this.setState({
      visible: false,
    });
    message.success('Register Success,Welcome to YISHOU');
    window.$isLogin = true;
    const url = this.props.location.pathname;
    this.props.history.replace(url);
  };
  render() {
    const { isTransparent = false } = this.props;
    const { visible } = this.state;
    const isLogin = window.$isLogin;
    const isIndex = this.props.location.pathname === '/' ? true : false;
    return (
      <div
        className={`${styles.wrapper} ${styles.wrapperNormal} ${
          isTransparent && styles.wrapperIndex
        }`}
      >
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            {!isIndex && (
              <img
                src={logoUrl}
                alt=""
                className={styles.logo}
                onClick={() => this.props.history.push('/')}
              />
            )}
            <Button
              type="link"
              onClick={() => this.props.history.push('/home')}
              style={isIndex ? { color: '#fff' } : {}}
            >
              Home
            </Button>
            <Search onSearch={this.search}></Search>
          </div>
          <div className={styles.contentRight}>
            {isLogin ? (
              this.userAvatar()
            ) : (
              <React.Fragment>
                <Button onClick={() => this.sign(1)}>Sign In</Button>
                <Button onClick={() => this.sign(2)}>Sign Up</Button>
              </React.Fragment>
            )}
          </div>
        </div>
        <Modal
          visible={visible}
          footer={null}
          centered={true}
          onCancel={() => this.setState({ visible: false })}
        >
          <Sign
            {...this.state}
            changeType={this.changeType}
            login={this.login}
            register={this.register}
            inputValueChange={this.inputValueChange}
          />
        </Modal>
      </div>
    );
  }
}

export default withRouter(TopBar);
