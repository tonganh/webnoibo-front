import { GET } from './Types';

const initialSate = {
  reportOts: [],
};

const otsReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        reportOts: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default otsReducer;
