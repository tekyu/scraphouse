import { combineReducers } from 'redux';
import { appReducer } from 'store/app/appReducer';
import { userReducer } from 'store/user/userReducer';

export default combineReducers({
  app: appReducer,
  user: userReducer,
});
