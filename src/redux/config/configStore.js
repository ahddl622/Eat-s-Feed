import { createStore, combineReducers } from 'redux';
import email from 'redux/modules/email';
import password from 'redux/modules/password';

const rootReducer = combineReducers({
  email, password
});

const store = createStore(rootReducer);

export default store;
