export const initialState = {
  fetching: false,
  loadMoreFetching: false,
  data: [],
  nextPage: 1,
  count: null,
  error: null,
};

const ACTION_HANDLERS = {
  BooksListFetching: (state) => {
    return {
      ...state,
      fetching: true,
    };
  },

  BooksListSuccess: (state, action) => {
    return {
      ...state,
      fetching: false,
      data: action.payload.results,
      count: action.payload.count,
      nextPage: action.payload.nextPage,
      error: null,
    };
  },

  BooksListError: (state, action) => {
    return {
      ...state,
      fetching: false,
      error: action.payload,
    };
  },

  LoadMoreBooksFetching: (state, action) => {
    return {
      ...state,
      loadMoreFetching: true,
    };
  },

  LoadMoreBooksSuccess: (state, action) => {
    return {
      ...state,
      loadMoreFetching: false,
      data: [...state.data, ...action.payload.results],
      count: action.payload.count,
      nextPage: action.payload.nextPage,
      error: null,
    };
  },

  LoadMoreBooksError: (state, action) => {
    return {
      ...state,
      loadMoreFetching: false,
      error: action.payload,
    };
  },
};

const bookReducer = (state = initialState, action) =>
  ACTION_HANDLERS[action.type]
    ? ACTION_HANDLERS[action.type](state, action)
    : state;

export default bookReducer;
