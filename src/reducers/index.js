import merge from 'lodash/merge';
import { combineReducers } from 'redux';

import paginate from './paginate';

const entities = (state = {
  users: {},
  photos: {}
}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

const pagination = combineReducers({
  photosByUser: paginate({
    mapActionToKey: (action) => action.username,
    types: ['USER_PHOTOS_REQUEST', 'USER_PHOTOS_SUCCESS', 'USER_PHOTOS_FAILURE']
  })
});

const randomPhotoId = (state = null, action) => {
  switch(action.type) {
    case 'RANDOM_PHOTO_SUCCESS':
      return action.response.result;
    default:
      return state;
  }
};

const serverError = (state = null, action) => {
  const  { error } = action;

  if (error) {
    return error;
  }

  return state;
};

export default combineReducers({
  entities,
  pagination,
  randomPhotoId,
  serverError
});
