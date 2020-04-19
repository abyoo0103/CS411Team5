import axios from 'axios';
import * as constants from './constants';

export const change = (account, password) => {
	return (dispatch) => {
		fetch('http://localhost:3001/write/update?password='+password+'&username='+account)
  }
}

export const remove = (account) => {
  return (dispatch) => {
    fetch('http://localhost:3001/write/delete?username='+account)
  }
}
