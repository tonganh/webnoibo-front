import { combineReducers } from 'redux';
import loginReducer from './login/reducer';

import projectReducer from './project/Reducer';
import employees from './employees/Reducer';
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = () => combineReducers({
  projectReducer,
  loginReducer,
  employees,
});
