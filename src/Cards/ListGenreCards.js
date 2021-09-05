import React from "react";

import GenreCard from "./GenreCard";
import { genreData } from "../Constants";
import "./ListGenreCards.css";

function ListGenreCards() {
  const listCards = genreData.map(({ title, iconPath, altText }) => (
    <GenreCard title={title} src={iconPath} alt={altText} />
  ));

  return (
    <div className="ListGenreCards-page">
      <div className="genre-page-container">
        <div className="header">
          <h1>Gutenberg Project</h1>
          <p>
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </p>
        </div>
        <div className="list-genre-container">{listCards}</div>
      </div>
    </div>
  );
}

export default ListGenreCards;
