import { combineReducers } from 'redux';
import loginReducer from './login/Reducer';

import projectReducer from './project/Reducer';
import employees from './employees/Reducer';
import otsReducer from './ots/Reducer';
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = () => combineReducers({
  projectReducer,
  loginReducer,
  employees,
  otsReducer,
});
