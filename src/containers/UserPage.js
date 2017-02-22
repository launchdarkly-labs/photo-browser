import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchUser, fetchPhotos } from '../actions';
import Page from '../components/Page';
import Header from '../components/Header';
import Main from '../components/Main';
import Loading from '../components/Loading';
import User from '../components/User';
import Photo from '../components/Photo';
import PaginatedList from '../components/PaginatedList';
import { PrimaryButton } from '../components/Button';

const loadData = ({ username, loadUser, loadPhotos }) => {
  Promise.all([
    loadUser(username),
    loadPhotos(username)
  ]).catch(() => {
    console.log('Failed to load data');
  });
};

class UserPage extends React.Component {
  componentWillMount() {
    loadData({
      username: this.props.username,
      loadUser: this.props.fetchUser,
      loadPhotos: this.props.fetchPhotos
    });
  }

  render() {
    const { username, user, photos, photoPagination, fetchPhotos } = this.props;

    if (!user) {
      return (
        <Loading>Loading profile…</Loading>
      );
    }

    return (
      <Page>
        <Header>
          <Link to="/" className="mr2 mr3-m mr4-l f6 fw6 link dim white">Home</Link>
          <User user={user} />
        </Header>
        <Main>
          <PaginatedList
            items={photos}
            {...photoPagination}
            renderItem={(photo) => (
              <Photo
                key={photo.id}
                photo={photo}
              />
            )}
            renderPagination={({isFetching}) => (
              <div className="tc pa4">
                <PrimaryButton
                  onClick={() => fetchPhotos(username, true)}
                  disabled={isFetching}
                >
                  {isFetching ? 'loading…' : 'load more'}
                </PrimaryButton>
              </div>
            )}
            renderLoading={() => (
              <div className="tc pa3">
                <h2 className="f3 mid-gray lh-title">Loading photos…</h2>
              </div>
            )}
            renderEmpty={() => (
              <div className="tc pa3">
                <h2 className="f3 mid-gray lh-title">No photos available</h2>
              </div>
            )}
          />
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const username = props.params.username;

  const {
    entities: { users, photos },
    pagination: { photosByUser }
  } = state;

  const userPhotoPagination = photosByUser[username] || { ids: [] };
  const userPhotos = userPhotoPagination.ids.map(id => photos[id]);

  return {
    username,
    user: users[username],
    photos: userPhotos,
    photoPagination: userPhotoPagination
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchPhotos
})(UserPage);
