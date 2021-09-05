import React from "react";

import "./BookCard.css";

function BookCard({ title, author, image, formats }) {
  const openBook = () => {
    if (formats["text/html; charset=utf-8"]) {
      window.open(formats["text/html; charset=utf-8"], "_blank");
    } else if (formats["application/pdf"]) {
      window.open(formats["application/pdf"], "_blank");
    } else if (formats["text/plain; charset=utf-8"]) {
      window.open(formats["text/plain; charset=utf-8"], "_blank");
    } else {
      window.alert("Format not available");
    }
  };

  return (
    <div className="book-container" onClick={openBook}>
      <img src={image} alt="Book Cover" className="book-container-img" />
      <p className="title">{title}</p>
      <p className="author">{author}</p>
    </div>
  );
}

export default BookCard;
