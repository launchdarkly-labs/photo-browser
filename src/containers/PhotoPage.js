import React from 'react';
import { connect } from 'react-redux';

import { fetchPhoto } from '../actions';
import Page from '../components/Page';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import User from '../components/User';
import { Heart } from '../components/icon';

const loadData = ({ photoId, loadPhoto }) => {
  return loadPhoto(photoId);
};

class PhotoPage extends React.Component {
  static loadData({dispatch}, {params}) {
    return loadData({
      photoId: params.photoId,
      loadPhoto: (id) => dispatch(fetchPhoto(id))
    });
  };

  componentWillMount() {
    loadData({
      photoId: this.props.photoId,
      loadPhoto: this.props.fetchPhoto
    });
  }

  render() {
    const { photoId, photo, user } = this.props;

    if (!photo || !user) {
      return (
        <Loading>Loading photo…</Loading>
      );
    }

    return (
      <div
        className="relative vh-100 dt w-100 tc white cover"
        style={{
          background: `${photo.color} url(${photo.urls.regular}) no-repeat center`
        }}
      >
        <Nav />

        <div
          className="absolute left-0 bottom-0 w-100 flex items-center justify-between pv2 ph4 tc bg-black-40"
        >
          <User user={user} className="link white" showName />

          <span>
            <Heart size="tiny" />
            <span className="pl2">{photo.likes}</span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const photoId = props.params.photoId;

  const { entities: { users, photos } } = state;

  return {
    photoId,
    photo: photos[photoId],
    user: users[photos[photoId].user]
  };
};

export default connect(mapStateToProps, {
  fetchPhoto
})(PhotoPage);
