// eslint-disable-next-line import/prefer-default-export
import {
  ADD_EMPLOYEE, AFTER_UPDATE, DELETE_USER, GET,
} from './Types';

// eslint-disable-next-line import/prefer-default-export
export function getEmployeesList(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
export function updateEmployeeList(data) {
  return (dispatch) => dispatch({
    type: AFTER_UPDATE,
    payload: data,
  });
}
export function addUsertoList(data) {
  return (dispatch) => dispatch({
    type: ADD_EMPLOYEE,
    payload: data,
  });
}
export function deleteUser(id) {
  return (dispatch) => dispatch({
    type: DELETE_USER,
    payload: id,
  });
}
