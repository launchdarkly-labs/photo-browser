import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchRandomPhoto } from '../actions';
import Page from '../components/Page';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import User from '../components/User';
import { Home, Heart } from '../components/icon';

const loadData = ({ loadPhoto }) => {
  return loadPhoto();
};

class RandomPhotoPage extends React.Component {
  static loadData({dispatch}) {
    return loadData({
      loadPhoto: () => dispatch(fetchRandomPhoto())
    });
  };

  componentWillMount() {
    loadData({
      loadPhoto: this.props.fetchRandomPhoto
    });
  }

  render() {
    const { photoId, photo, user } = this.props;

    if (!photo || !user) {
      return (
        <Loading>Loading random photo…</Loading>
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
  const {
    randomPhotoId,
    entities: { users, photos }
  } = state;
  
  const photo = photos[randomPhotoId];
  const user = photo && users[photo.user];

  return {
    photoId: randomPhotoId,
    photo,
    user
  };
};

export default connect(mapStateToProps, {
  fetchRandomPhoto
})(RandomPhotoPage);
