import { GET } from './Types';

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
