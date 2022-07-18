import { combineReducers } from 'redux';
import blogReducer from './blogs';
import postReducer from './posts';
import notifyReducer from './notify';
import galleriesReducer from './galleries';

const rootReducer = combineReducers({
  blogs: blogReducer,
  posts: postReducer,
  notify: notifyReducer,
  galleries: galleriesReducer,
});

export default rootReducer;
