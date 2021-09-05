import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import BookCard from "./BookCard";
import { getBooksList, getMoreBooks } from "../Actions/bookAction";
import "./ListBookCards.css";

function ListBookCards() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  let history = useHistory();
  let booksData = useSelector((state) => state.bookReducer.data);
  let booksFetch = useSelector((state) => state.bookReducer.fetching);
  let loadMoreBookFetching = useSelector(
    (state) => state.bookReducer.loadMoreFetching
  );
  let nextPage = useSelector((state) => state.bookReducer.nextPage);

  // Mounting
  useEffect(() => {
    // Passing 'bookType' argument value to bookAction
    dispatch(getBooksList(history.location.state.genre));
    return () => {};
  }, []);

  const onSearch = (value) => {
    dispatch(getBooksList(null, value));
  };

  const debounceOnSearch = useCallback(debounce(onSearch, 1000), []);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.length > 2) {
      debounceOnSearch(value);
    }
  };

  const loadMore = () => {
    !loadMoreBookFetching && dispatch(getMoreBooks());
  };

  const redirectBack = () => {
    history.goBack();
  };

  const onCancel = () => {
    setSearchInput("");
  };

  const listCards = () =>
    booksData.map(({ title, authors, formats, id }) => (
      <BookCard
        key={id}
        title={title}
        author={authors[0] ? authors[0].name : "NA"}
        image={formats["image/jpeg"]}
        formats={formats}
      />
    ));

  return (
    <div className="ListBookCards-page">
      <div className="search-input">
        <div className="book-page-title">
          <img src="icons/Back.svg" alt="" onClick={redirectBack} />
          <h1>Fiction</h1>
        </div>

        <TextField
          className="search-box"
          id="input-with-icon-textfield"
          placeholder="Search"
          value={searchInput}
          onChange={onSearchChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <img
                src="icons/Search.svg"
                alt="Search"
                className="search-icon"
              />
            ),
            endAdornment: searchInput.length > 1 && (
              <img
                onClick={onCancel}
                src="icons/Cancel.svg"
                alt="Search"
                className="cancel-icon"
              />
            ),
          }}
        />
      </div>

      <div className="book-page-container">
        {booksFetch ? (
          <CircularProgress />
        ) : (
          <div className="list-book-container">{listCards()}</div>
        )}
        {!booksFetch && nextPage && (
          <Button variant="contained" color="primary" onClick={loadMore}>
            {loadMoreBookFetching ? <CircularProgress /> : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ListBookCards;
