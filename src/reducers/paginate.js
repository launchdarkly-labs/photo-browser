export default ({types, mapActionToKey}) => {
  const [requestType, successType, failureType] = types;

  const updatePagination = (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) => {
    switch(action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: [...new Set([...state.ids, ...action.response.result])],
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        };
      case failureType:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    switch(action.type) {
      case requestType:
      case failureType:
      case successType:
        const key = mapActionToKey(action);
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        };
      default:
        return state;
    }
  };
};
