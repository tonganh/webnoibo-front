// eslint-disable-next-line import/prefer-default-export
import { GET } from './Types';

// eslint-disable-next-line import/prefer-default-export
export function getEmployeesList(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
