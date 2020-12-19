import { LOG_IN } from './types';

const initialState = {
  userInfo: {},
  token: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload.data,
      };
    default: {
      return state;
    }
  }
};

export default loginReducer;
