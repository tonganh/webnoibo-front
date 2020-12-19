/* eslint-disable linebreak-style */

import { GET } from './Types';

// eslint-disable-next-line import/prefer-default-export
export function getProject() {
  return (dispatch) => dispatch({
    type: GET,
  });
}
