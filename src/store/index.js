import { combineReducers } from 'redux';
import loginReducer from './login/Reducer';

import projectReducer from './project/Reducer';
import userReducer from './employees/Reducer';
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = () => combineReducers({
  projectReducer,
  loginReducer,
  userReducer,
});
