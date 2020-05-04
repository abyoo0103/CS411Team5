import React, { Component } from 'react';
import styles from './index.less';
import TopBar from '../../components/TopBar';
import { Tabs, Form, Input, Button, message, Radio } from 'antd';

const { TabPane } = Tabs;
const plainOptions = ['Yes', 'No'];

class Setting extends Component {
  constructor() {
    super();
    this.state = {
      oldPsw: '', //旧密码
      newPsw: '', //新密码
      confirmPsw: '', //确认密码
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    };
  }

  /**
   * input输入保存各种密码
   * change input password
   * @param key string 需要修改的密码 对应state
   */
  changeValue = (key, value) => {
    this.setState({
      [key]: value.target.value,
    });
  };

  /**
   * 提交密码修改
   * submit password change
   */
  submitChange = () => {
    const { oldPsw, newPsw, confirmPsw } = this.state;
    if (!oldPsw || !newPsw || !confirmPsw) {
      //check if two psw are same or not
      message.error('Please enter your password correctly!');
      return;
    }
    if (newPsw === confirmPsw) {
      //if two psw are same
      message.success('Password changed successfully！');
      this.setState({
        oldPsw: '',
        newPsw: '',
        confirmPsw: '',
      });
    } else {
      message.error('The two new passwords do not match, please re-enter!');
    }
  };

  /**
   * 确认删除账号
   * confirm delete account
   */
  delete = () => {
    message.success('The account has been deleted, thank you for your use!');
    this.props.history.push('/home');
  };

  //four questions
  onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = e => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      value2: e.target.value,
    });
  };

  onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

  onChange4 = e => {
    console.log('radio4 checked', e.target.value);
    this.setState({
      value4: e.target.value,
    });
  };

  submitSurvey = () => {
    const { value1, value2, value3, value4 } = this.state;
    if (!value1 || !value2 || !value3 || !value4) {
      //check if two psw are same or not
      message.error('Please answer all questions!');
      return;
    } else {
      message.success('Questionnaire submited successfully！');
      //add your fetch code here to pass 4 results
    }
  }


  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
    };
    const { oldPsw, newPsw, confirmPsw } = this.state;
    const { value1, value2, value3, value4 } = this.state;
    return (
      <div className={styles.wrapper}>
        <TopBar></TopBar>
        <div className={styles.setting}>
          <Tabs defaultActiveKey="1" style={{ width: '960px' }} tabPosition="left">
            <TabPane tab="Password Change" key="1">
              <div className={styles.partTitle}>Password Change</div>
              <Form {...layout}>
                <Form.Item label="original password">
                  <Input.Password
                    placeholder="Please enter the original password"
                    value={oldPsw}
                    onChange={val => this.changeValue('oldPsw', val)}
                  />
                </Form.Item>
                <Form.Item label="new password">
                  <Input.Password
                    placeholder="Please enter the new password"
                    value={newPsw}
                    onChange={val => this.changeValue('newPsw', val)}
                  />
                </Form.Item>
                <Form.Item label="confirm password">
                  <Input.Password
                    placeholder="Please enter your new password again"
                    value={confirmPsw}
                    onChange={val => this.changeValue('confirmPsw', val)}
                  />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={this.submitChange}>
                Submit
              </Button>
            </TabPane>
            <TabPane tab="Account Manage" key="2">
              <div className={styles.partTitle}>Delete Account Permanently</div>
              <ul>
                <li>
                  Make sure there are no public or private articles before deleting your account.
                </li>
                <li>
                  Deleting an account is an irreversible operation and cannot be restored after
                  deletion.
                </li>
              </ul>
              <Button type="primary" onClick={this.delete}>
                Confirm Delete
              </Button>
            </TabPane>
            <TabPane tab="Questionnaire" key="3">
              <div className={styles.partTitle}>Finish this Questionnaire</div>
              <ul>
                <li>
                    Are you interested in the Mathematics?
                </li>
                <Radio.Group options={plainOptions} onChange={this.onChange1} value={value1} />
                <li>
                    Are you interested in surgery?
                </li>
                <Radio.Group options={plainOptions} onChange={this.onChange2} value={value2} />
                <li>
                    Are you interested in Engineering?
                </li>
                <Radio.Group options={plainOptions} onChange={this.onChange3} value={value3} />
                <li>
                    Are you interested in medicine?
                </li>
                <Radio.Group options={plainOptions} onChange={this.onChange4} value={value4} />
              </ul>
              <Button type="primary" onClick={this.submitSurvey}>
                Submit
              </Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Setting;
