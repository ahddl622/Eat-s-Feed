import { createStore, combineReducers } from 'redux';
import { contentReducer } from 'store/modules/contentReducer';
import { editedContentReducer } from 'store/modules/editedContentReducer';
import { feedListReducer } from 'store/modules/feedListReducer';
import { imgURLReducer } from 'store/modules/imgURLReducer';
import { loginProfileReducer } from 'store/modules/loginProfileReducer';
import { titleReducer } from 'store/modules/titleReducer';
import { userLoginStatus } from 'store/modules/userLoginStatus';

const rootReducer = combineReducers({
  contentReducer,
  editedContentReducer,
  feedListReducer,
  imgURLReducer,
  loginProfileReducer,
  titleReducer,
  userLoginStatus
});

export const store = createStore(rootReducer);
