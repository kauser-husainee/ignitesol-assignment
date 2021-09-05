import React from "react";
import { useHistory } from "react-router-dom";

import "./GenreCard.css";

function GenreCard({ title, src, alt }) {
  let history = useHistory();

  // useHistory is used here to pass data (an object) on routing to 'catalog'
  function handleClick() {
    history.push("/catalog", { genre: title.toLowerCase() });
  }

  return (
    <div className="genre-container" onClick={handleClick}>
      <div className="text">
        <img src={src} alt={alt} />
        <span>{title}</span>
      </div>
      <div className="arrow">
        <img src="icons/Next.svg" alt="Next" />
      </div>
    </div>
  );
}

export default GenreCard;
