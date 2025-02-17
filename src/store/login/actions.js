/* eslint-disable import/prefer-default-export */
// action login
import { LOG_IN, LOG_OUT } from './Types';

export function actionLogin(data) {
  return (dispatch) => dispatch({
    type: LOG_IN,
    payload: data,
  });
}
export function actionLogOut() {
  return (dispatch) => dispatch({
    type: LOG_OUT,
  });
}

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
