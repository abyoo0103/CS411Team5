import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

const state = {
  result: []
}

export const login = (account, password) => {
  return (dispatch) => {
		axios.get('http://localhost:3000/api/login.json?account=' + account + '&password=' + password).then((res) => {
			const result = res.data.data;
			if (result) {
        dispatch(changeLogin())
			}else {
				alert('Failed login')
			}
		})
	}

}
