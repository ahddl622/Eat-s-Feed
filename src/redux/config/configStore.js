import { createStore, combineReducers } from 'redux';
import { feedListReducer } from '../modules/feedListReducer';
import { titleReducer } from '../modules/titleReducer';
import { contentReducer } from '../modules/contentReducer';
import { editedContentReducer } from '../modules/editedContentReducer';
import { imgURLReducer } from '../modules/imgURLReducer';
// import { countReducer } from '../modules/countReducer';

const rootReducer = combineReducers({
  feedListReducer,
  titleReducer,
  contentReducer,
  editedContentReducer,
  imgURLReducer
  // countReducer
});

const store = createStore(rootReducer);

export default store;
