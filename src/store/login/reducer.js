import { LOG_IN, LOG_OUT } from './Types';

const initialState = {
  userInfo: {},
  token: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        userInfo: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        userInfo: {},
        token: '',
      };
    default: {
      return state;
    }
  }
};

export default loginReducer;
