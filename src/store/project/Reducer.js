/* eslint-disable linebreak-style */

import { GET } from './Types';

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
    default:
      return state;
  }
};

export default projectReducer;
