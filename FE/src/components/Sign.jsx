import React, { Component } from 'react';
import styles from './Sign.less';
import { Input, Button } from 'antd';

const userIcon = require('@/assets/icons/icon_user.png');

const pswIcon = require('@/assets/icons/icon_psw.png');

class Sign extends Component {
  /**
   * 修改表单类型
   */
  changeType = type => {
    this.props.changeType(type);
  };

  render() {
    const { type, signIn, signUp } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.type}>
          <span
            className={`${styles.typeButton} ${type === 1 && styles.typeActive}`}
            onClick={() => this.changeType(1)}
          >
            Sign In
          </span>
          <span> |</span>
          <span
            className={`${styles.typeButton} ${type === 2 && styles.typeActive}`}
            onClick={() => this.changeType(2)}
          >
            Sign Up
          </span>
        </div>

        {type === 1 ? (
          <React.Fragment>
            <Input
              prefix={<img src={userIcon} alt=""></img>}
              placeholder="Email"
              value={signIn.name}
              onChange={val => this.props.inputValueChange('signIn', 'name', val)}
            />
            <Input.Password
              prefix={<img src={pswIcon} alt=""></img>}
              placeholder="password"
              value={signIn.password}
              onChange={val => this.props.inputValueChange('signIn', 'password', val)}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Input
              prefix={<img src={userIcon} alt=""></img>}
              placeholder="Email"
              value={signUp.name}
              onChange={val => this.props.inputValueChange('signUp', 'name', val)}
            />
            <Input.Password
              prefix={<img src={pswIcon} alt=""></img>}
              placeholder="set password"
              value={signUp.password}
              onChange={val => this.props.inputValueChange('signUp', 'password', val)}
            />
            <Input.Password
              prefix={<img src={pswIcon} alt=""></img>}
              placeholder="confirm password"
              value={signUp.confirmPsw}
              onChange={val => this.props.inputValueChange('signUp', 'confirmPsw', val)}
            />
          </React.Fragment>
        )}

        {type === 1 ? (
          <Button type="primary" onClick={this.props.login}>
            Sign In
          </Button>
        ) : (
          <Button
            type="primary"
            style={type === 2 ? { backgroundColor: '#42c02e', border: 'none' } : {}}
            onClick={this.props.register}
          >
            Sign Up
          </Button>
        )}
      </div>
    );
  }
}

export default Sign;
