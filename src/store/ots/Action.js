/* eslint-disable import/prefer-default-export */
import { GET, OTS_GET_OPTION } from './Types';

export function getAllOts(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
export function getOption(data) {
  return (dispatch) => dispatch({
    type: OTS_GET_OPTION,
    payload: data,
  });
}
