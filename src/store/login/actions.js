/* eslint-disable import/prefer-default-export */
// action login
import { LOG_IN } from './types';

export const actionLogin = (data) => async () => (dispatch) => {
  dispatch({
    type: LOG_IN,
    payload: data,
  });
};

// try {
//   const respone = await testAPI.post('/login', data);
//   if (respone.data.status === 401) {
//     return respone.data.message;
//   }
//   localStorage.setItem('email', respone.data.email);
//   return { status: 200, data: respone.data };
// } catch (err) {
//   console.log('Action failed');
//   return err;
// }
