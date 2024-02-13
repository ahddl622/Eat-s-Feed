import { createStore, combineReducers } from 'redux';
import email from 'store/modules/email';
import password from 'store/modules/password';

const rootReducer = combineReducers({
  email, password
});

const store = createStore(rootReducer);

export default store;
