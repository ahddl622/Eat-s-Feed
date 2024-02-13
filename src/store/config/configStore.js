import { createStore, combineReducers } from 'redux';
import userUidReducer from 'store/modules/userUidReducer';
import { feedListReducer } from '../modules/feedListReducer';
import { titleReducer } from '../modules/titleReducer';
import { contentReducer } from '../modules/contentReducer';
import { editedContentReducer } from '../modules/editedContentReducer';
import userNicknameReducer from 'store/modules/userNicknameReducer';
import userEmailReducer from 'store/modules/userEmailReducer';
import userLoginStatus from 'store/modules/userLoginStatus';

const rootReducer = combineReducers({
  feedListReducer,
  titleReducer,
  contentReducer,
  editedContentReducer,
  userUidReducer,
  userNicknameReducer,
  userEmailReducer,
  userLoginStatus
});

const store = createStore(rootReducer);

export default store;
