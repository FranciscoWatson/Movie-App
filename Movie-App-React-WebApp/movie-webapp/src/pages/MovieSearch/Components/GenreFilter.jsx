import React from "react";

const GenreFilter = ({ genres, selectedGenres, onGenreChange }) => {
  const handleCheckboxChange = (event) => {
    const genreId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      onGenreChange([...selectedGenres, genreId]);
    } else {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    }
  };

  return (
    <div>
      {genres.map((currentGenre) => (
        <li key={currentGenre.id}>
          <input
            type="checkbox"
            id={currentGenre.id}
            value={currentGenre.id}
            onChange={handleCheckboxChange}
            checked={selectedGenres.includes(currentGenre.id)} 
          />
          <label htmlFor={currentGenre.id}>{currentGenre.name}</label>
        </li>
      ))}
    </div>
  );
};

export default GenreFilter;