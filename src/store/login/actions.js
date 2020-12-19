/* eslint-disable import/prefer-default-export */
// action login
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
export const actionLogin = (data) => async () => {
  try {
    const respone = await axios.post('/login', data);
    if (respone.data.status === 401) {
      return respone.data.message;
    }
    localStorage.setItem('username', respone.data.name);
    return { status: 200, data: respone.data };
  } catch (err) {
    console.log('Action failed');
    return err;
  }
};
