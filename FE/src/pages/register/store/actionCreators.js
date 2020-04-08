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

export const register = (account, password) => {
	return (dispatch) => {
		axios.post('/api/login.json?account=' + account + '&password=' + password, {
      data: 'abcdef'
    })
  }
}
