import { GET } from './Types';

const initialState = {
  employees: [],
};

const employees = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        employees: [...action.payload],
      };
    default:
      return state;
  }
};

export default employees;
