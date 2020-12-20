// eslint-disable-next-line import/prefer-default-export
import { AFTER_UPDATE, GET } from './Types';

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
