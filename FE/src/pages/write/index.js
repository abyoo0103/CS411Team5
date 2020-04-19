import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { WriteWrapper, WriteBox, Input, Button } from './style';
import { actionCreators } from './store';

class Write extends PureComponent {
	render() {
		const { loginStatus } = this.props;
		if (loginStatus) {
			return (
				<WriteWrapper>
          <WriteBox>
            <header><h1 align="center">Settings</h1></header>
            <header><h2 align="center">Enter username again to change settings</h2></header>
            <Input placeholder="Account" innerRef={(input) => {this.account = input}}/>
            <header><h2 align="center">Change password></h2></header>
            <Input placeholder="Change password" innerRef={(input) => {this.password = input}}/>
            <Link to='/write'><Button onClick={() => this.props.changePassword(this.account,this.password)}>Submit</Button></Link>
            <header><h2 align="center">Delete account></h2></header>
            <Link to='/'><Button onClick={() => this.props.deleteAccount(this.account)}>Delete Account</Button></Link>
            <header><h1 align="center">Following</h1></header>
          </WriteBox>
        </WriteWrapper>
			)
		}else {
			return <Redirect to='/login'/>
		}
	}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
  changePassword(accountElem, passwordElem){
    dispatch(actionCreators.change(accountElem.value, passwordElem.value))
  },
  deleteAccount(accountElem){
    dispatch(actionCreators.remove(accountElem.value))
  }
})

export default connect(mapState, mapDispatch)(Write);
