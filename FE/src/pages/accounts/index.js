import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { WriteWrapper, WriteBox, Input, Button } from './style';
import { actionCreators } from './store';

class Accounts extends PureComponent {
  constructor(props){
    super(props);
    this.state = { accounts: [] };

    fetch('http://localhost:3001/write/read')
      .then(response => response.json())
      .then(response => this.setState({accounts: response.data}))
  }
	render() {
	  return (
			<WriteWrapper>
         <WriteBox>
           <header><h1 align="center">Accounts</h1></header>
         </WriteBox>
      </WriteWrapper>
	  )
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

export default connect(mapState, mapDispatch)(Accounts);
