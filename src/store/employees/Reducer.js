/* eslint-disable implicit-arrow-linebreak */
import {
  ADD_EMPLOYEE, AFTER_UPDATE, DELETE_USER, GET,
} from './Types';

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
    case ADD_EMPLOYEE: return {
      ...state,
      employees: state.employees.concat(action.payload.data),
    };
    case DELETE_USER: return {
      ...state,
      employees: state.employees.filter((user) => user.id !== action.payload),
    };
    default:
      return state;
  }
};

export default employees;
