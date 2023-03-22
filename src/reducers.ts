import { combineReducers } from 'redux';
import UsersReducer from './reducers/users';

const appReducer = combineReducers({
  users: UsersReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;