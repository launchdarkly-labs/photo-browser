import React from 'react';
import { connect } from 'react-redux';

import { fetchUser, fetchUserPhotos } from '../actions';
import Page from '../components/Page';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Loading from '../components/Loading';
import User from '../components/User';
import Photo from '../components/Photo';
import PaginatedList from '../components/PaginatedList';
import { PrimaryButton } from '../components/Button';

const loadData = ({ username, loadUser, loadPhotos }) => {
  return Promise.all([
    loadUser(username),
    loadPhotos(username)
  ]);
};

class UserPage extends React.Component {
  static loadData({dispatch, getState}, {params}) {
    return loadData({
      username: params.username,
      loadUser: (u) => dispatch(fetchUser(u)),
      loadPhotos: (u) => dispatch(fetchUserPhotos(u))
    });
  };

  componentWillMount() {
    loadData({
      username: this.props.username,
      loadUser: this.props.fetchUser,
      loadPhotos: this.props.fetchUserPhotos
    });
  }

  render() {
    const { username, user, photos, photoPagination, fetchUserPhotos } = this.props;

    if (!user) {
      return (
        <Loading>Loading profile…</Loading>
      );
    }

    return (
      <Page>
        <Nav />
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
                  onClick={() => fetchUserPhotos(username, true)}
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
  fetchUserPhotos
})(UserPage);
