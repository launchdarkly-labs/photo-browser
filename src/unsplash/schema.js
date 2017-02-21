import { schema } from 'normalizr';

let user, photo, photoList;

user = new schema.Entity('users', {}, {
  idAttribute: user => user.username
});

photo = new schema.Entity('photos', {
  user: user
});

photoList = [photo];

export {
  user,
  photo,
  photoList
};
