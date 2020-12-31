/* eslint-disable import/prefer-default-export */
import { GET } from './Types';

export function getAllSalary(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
