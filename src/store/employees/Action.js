// eslint-disable-next-line import/prefer-default-export
export const GET = 'GET';
export function getAllUsers(data) {
  return (dispatch) => dispatch({
    type: GET,
    payload: data,
  });
}
