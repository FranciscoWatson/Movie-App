import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY = '81b11a2b974891b65c1d7eb7fe785eb3';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovies = async (searchQuery) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const searchedMovies = await fetchMovies(query);
    setMovies(searchedMovies);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;
