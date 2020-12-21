/* eslint-disable linebreak-style */

import { GET } from './Types';

// eslint-disable-next-line import/prefer-default-export
export function getProject(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
