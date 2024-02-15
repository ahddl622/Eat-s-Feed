import { createStore, combineReducers } from 'redux';
import { feedListReducer } from '../modules/feedListReducer';
import { titleReducer } from '../modules/titleReducer';
import { contentReducer } from '../modules/contentReducer';
import { editedContentReducer } from '../modules/editedContentReducer';
import { imgURLReducer } from '../modules/imgURLReducer';
import userLoginStatus from 'store/modules/userLoginStatus';
import { loginProfileReducer } from 'store/modules/loginProfileReducer';

const rootReducer = combineReducers({
  feedListReducer,
  titleReducer,
  contentReducer,
  editedContentReducer,
  imgURLReducer,
  userLoginStatus,
  loginProfileReducer
});

const store = createStore(rootReducer);

export default store;
