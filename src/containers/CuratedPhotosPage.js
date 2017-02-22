import React from 'react';
import { connect } from 'react-redux';

import { fetchCuratedPhotos } from '../actions';
import Page from '../components/Page';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import Main from '../components/Main';
import Photo from '../components/Photo';
import PaginatedList from '../components/PaginatedList';
import { PrimaryButton } from '../components/Button';

const loadData = ({loadPhotos}) => {
  return loadPhotos();
};

class CuratedPhotosPage extends React.Component {
  static loadData({dispatch}) {
    return loadData({
      loadPhotos: () => dispatch(fetchCuratedPhotos())
    });
  };

  componentWillMount() {
    loadData({
      loadPhotos: this.props.fetchCuratedPhotos
    });
  }

  render() {
    const { photos, photoPagination } = this.props;

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
                  onClick={() => this.props.fetchCuratedPhotos(true)}
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
  const {
    entities: { photos },
    pagination
  } = state;

  const curatedPagination = pagination.photos.curated || { ids: [] };
  const curatedPhotos = curatedPagination.ids.map(id => photos[id]);

  return {
    photos: curatedPhotos,
    photoPagination: curatedPagination
  };
};

export default connect(mapStateToProps, {
  fetchCuratedPhotos
})(CuratedPhotosPage);
