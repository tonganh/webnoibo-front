import { GET } from './Types';

const initialState = {
  salaries: [],
};

const salariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        salaries: [...action.payload],
      };
    default:
      return state;
  }
};

export default salariesReducer;
