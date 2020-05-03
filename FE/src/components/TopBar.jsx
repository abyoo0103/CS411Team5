import React, { Component } from 'react';
import { Input, Button, Menu, Dropdown, Avatar, Icon, Modal, message } from 'antd';
import styles from './TopBar.less';
import { withRouter, Link } from 'react-router-dom';
import Sign from './Sign';



const { Search } = Input;

const logoUrl = require('@/assets/images/logo_1.png');
const imgUrl = require('@/assets/images/img.jpg');

var name = '';

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


  /*
  * Function that calls SELECT_ACCOUNT_QUERY (Used for login function)
  */
  getAccount = _ => {
    const { signIn } = this.state;
    //const proxyurl = "https://cors-anywhere.herokuapp.com/"; //Used to try to bypass CORS block
    const url = `http://localhost:3001/accounts/select?username=${signIn.name}&password=${signIn.password}`;
    return fetch(url).then(response => response.json()).catch(err => console.error(err));
  };

  /*
  * Same as getAccount but used for register function (checks if username exists)
  */
  getUser =  _ => {
    const { signUp } = this.state;
    //const proxyurl = "https://cors-anywhere.herokuapp.com/"; //Used to try to bypass CORS block
    const url = `http://localhost:3001/accounts/exists?username=${signUp.name}`;
    return fetch(url).then(response => response.json()).catch(err => console.error(err));
  };

  /*
  * Inserts new account into database (used in register function)
  */
  createAccount = _ => {
    const { signUp } = this.state;
    //const proxyurl = "https://cors-anywhere.herokuapp.com/"; //Used to try to bypass CORS block
    const url = `http://localhost:3001/accounts/insert?username=${signUp.name}&password=${signUp.password}`;
    return fetch(url).then(response => response.json()).catch(err => console.error(err));
  };

  /**
   * 登录
   */
  login = async () => {
    const { signIn } = this.state;
    if (!signIn.name || !signIn.password) {
      message.error('Please enter an email and password!');
      return;
    }

    //Check if username/password is in database
    const val = await this.getAccount(); //Gets the value/query  (Uses aynchronous function await)
    if(typeof val === 'undefined'){
        message.error('The username or password is incorrect.');
        return;
	}

    this.setState({
      visible: false,
    });
    message.success('Login successful, welcome back');
    localStorage.setItem('usernameLocalStorage', signIn.name);

    window.$isLogin = true;
    const url = this.props.location.pathname;
    this.props.history.replace(url);
  };

  /**
   * 注册
   */
  register = async () => {
    const { signUp } = this.state;
    if (!signUp.name || !signUp.password || !signUp.confirmPsw) {
      message.error('Please enter the correct email or password!');
      return;
    }
    if (signUp.password !== signUp.confirmPsw) {
      message.error('The two passwords are different, please re-enter!');
      return;
    }

    //Check if username already exists in database
    const val = await this.getUser();
    if(typeof val !== 'undefined'){
        message.error('This username is already taken. Please choose another username.')
        return;
	}

    this.createAccount();

    this.setState({
      visible: false,
    });
    message.success('Register Success,Welcome to YISHOU');
    localStorage.setItem('usernameLocalStorage', signUp.name);

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
