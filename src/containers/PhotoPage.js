import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPhoto } from '../actions';
import Page from '../components/Page';
import Header from '../components/Header';
import Loading from '../components/Loading';
import User from '../components/User';
import { Home, Heart } from '../components/icon';

const loadData = ({ photoId, loadPhoto }) => {
  loadPhoto(photoId).catch(() => {
    console.log('Failed to load data');
  });
};

class PhotoPage extends React.Component {
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
        <Header>
          <Link to="/" className="link dim white"><Home size="tiny" /></Link> › <User user={user} />
        </Header>

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
