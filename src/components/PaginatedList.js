import React from 'react';

export default ({
  items,
  isFetching,
  nextPageUrl,
  pageCount,
  onLoadMoreClick,
  renderItem,
  renderPagination,
  renderLoading,
  renderEmpty
}) => {
  const isEmpty = items.length === 0;
  const isLastPage = !nextPageUrl;

  if (isEmpty && isFetching) {
    return renderLoading();
  }

  if (isEmpty && isLastPage) {
    return renderEmpty();
  }

  return (
    <div>
      <div className="cf w-100">
        {items.map(renderItem)}
      </div>
      {pageCount > 0 && !isLastPage && renderPagination({isFetching})}
    </div>
  );
};