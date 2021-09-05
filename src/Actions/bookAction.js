import axios from "axios";

export const getBooksList = (bookType, search) => {
  return async (dispatch, getState) => {
    try {
      let url =
        "http://skunkworks.ignitesol.com:8000/books/?mime_type=image/jpeg";

      dispatch({ type: "BooksListFetching" });

      if (bookType) {
        url = `${url}&topic=${bookType}`;
      } 
      if (search) {
        url = `${url}&search=${search}`;
      }

      let response = await axios.get(url);

      if (response.status === 200) {
        let {
          data: { count, next: nextPage, results },
        } = response;

        dispatch({
          type: "BooksListSuccess",
          payload: { count, results, nextPage },
        });
      } else {
        dispatch({ type: "BooksListError", payload: response.status });
      }

      return;
    } catch (error) {
      dispatch({ type: "BooksListError", payload: error.message });

      throw error;
    }
  };
};

export const getMoreBooks = () => {
  return async (dispatch, getState) => {
    try {
      // 'getState' enables us to use the Store inside an Action
      const nextPageUrl = getState().bookReducer.nextPage;

      dispatch({ type: "LoadMoreBooksFetching" });

      let response = await axios.get(nextPageUrl);

      if (response.status === 200) {
        let {
          data: { count, next: nextPage, results },
        } = response;

        dispatch({
          type: "LoadMoreBooksSuccess",
          payload: { count, results, nextPage },
        });
      } else {
        dispatch({ type: "LoadMoreBooksError", payload: response.status });
      }

      return;
    } catch (error) {
      dispatch({ type: "LoadMoreBooksError", payload: error.message });

      throw error;
    }
  };
};
