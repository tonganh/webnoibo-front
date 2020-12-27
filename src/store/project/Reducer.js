/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import {
  GET, UPDATE, ADD, DELETE,
} from './Types';

const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        projects: [...action.payload],
      };
    case UPDATE: return {
      ...state,
      projects: state.projects.map((project) => (project._id === action.payload.id ? action.payload : project)),
    };
    case ADD: return {
      ...state,
      projects: state.projects.concat(action.payload),
    };
    case DELETE: return {
      ...state,
      projects: state.projects.filter((project) => project._id !== action.payload),
    };
    default:
      return state;
  }
};

export default projectReducer;
