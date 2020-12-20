/* eslint-disable implicit-arrow-linebreak */
import { AFTER_UPDATE, GET } from './Types';

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
    case AFTER_UPDATE:
      return {
        ...state,
        employees: state.employees.map((user) =>
          (user.id === action.payload.data.id ? action.payload.data : user)),
      };
    default:
      return state;
  }
};

export default employees;
