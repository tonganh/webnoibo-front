/* eslint-disable linebreak-style */

import {
  ADD, DELETE, GET, UPDATE,
} from './Types';

// eslint-disable-next-line import/prefer-default-export
export function getProject(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
export function addProject(data) {
  return (dispatch) => dispatch({
    type: ADD,
    payload: data,
  });
}
export function deleteProject(data) {
  return (dispatch) => dispatch({
    type: DELETE,
    payload: data,
  });
}
export function updateProject(data) {
  return (dispatch) => dispatch({
    type: UPDATE,
    payload: data,
  });
}
