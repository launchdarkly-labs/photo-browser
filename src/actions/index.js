import { CALL_UNSPLASH, schema } from '../unsplash';

export const fetchUser = (username) => ({
  username,
  [CALL_UNSPLASH]: {
    types: ['USER_REQUEST', 'USER_SUCCESS', 'USER_FAILURE'],
    url: `/users/${username}`,
    schema: schema.user,
    skipIf: (state) => state.entities.users[username]
  }
});

export const fetchPhotos = (username, nextPage) => ({
  username,
  [CALL_UNSPLASH]: {
    types: ['USER_PHOTOS_REQUEST', 'USER_PHOTOS_SUCCESS', 'USER_PHOTOS_FAILURE'],
    url: (state) => {
      const {
        nextPageUrl = `/users/${username}/photos`,
      } = state.pagination.photosByUser[username] || {};

      return nextPageUrl;
    },
    schema: schema.photoList,
    skipIf: (state) => {
      const { pageCount = 0 } = state.pagination.photosByUser[username] || {};
      return pageCount > 0 && !nextPage;
    }
  }
});

export const fetchPhoto = (photoId) => ({
  photoId,
  [CALL_UNSPLASH]: {
    types: ['PHOTO_REQUEST', 'PHOTO_SUCCESS', 'PHOTO_FAILURE'],
    url: `/photos/${photoId}`,
    schema: schema.photo,
    skipIf: (state) => state.entities.photos[photoId]
  }
});

export const fetchRandomPhoto = () => ({
  [CALL_UNSPLASH]: {
    types: ['RANDOM_PHOTO_REQUEST', 'RANDOM_PHOTO_SUCCESS', 'RANDOM_PHOTO_FAILURE'],
    url: `/photos/random`,
    schema: schema.photo,
    skipIf: (state) => state.randomPhotoId
  }
});
