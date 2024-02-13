import { createStore, combineReducers } from 'redux';
import { feedListReducer } from '../modules/feedListReducer';
import { titleReducer } from '../modules/titleReducer';
import { contentReducer } from '../modules/contentReducer';
import { editedContentReducer } from '../modules/editedContentReducer';

const rootReducer = combineReducers({
  feedListReducer,
  titleReducer,
  contentReducer,
  editedContentReduce
});

const store = createStore(rootReducer);

export default store;
