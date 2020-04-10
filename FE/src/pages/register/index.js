import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store';


class Register extends PureComponent {
 	
	addAccount = _ => {
		const {product} = this.state;
		fetch(`https://localhost:3000/register/add?username=${product.account}&password=&{product.password}`)
	}

	render() {
		const { loginStatus } = this.props;
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='Enter your account' innerRef={(input) => {this.account = input}}/>
						<Input placeholder='Enter your password' type='password' innerRef={(input) => {this.password = input}}/>
            <Link to='/login'><Button onClick={() => this.props.register(this.account, this.password)}>Register account</Button></Link>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	} 
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
	register(accountElem, passwordElem){
		dispatch(actionCreators.register(accountElem.value, passwordElem.value))
	}
})

export default connect(mapState, mapDispatch)(Register);
