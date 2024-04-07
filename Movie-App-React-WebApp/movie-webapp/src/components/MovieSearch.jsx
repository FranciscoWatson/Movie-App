import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetailsPopup from "./MovieDetailsPopup"; // You'll create this component next

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null); // New state for active/focused movie

  const API_KEY = "81b11a2b974891b65c1d7eb7fe785eb3";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchMovies = async (searchQuery) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}`;
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

  const handleMovieSelect = (movie) => {
    setActiveMovie(movie); // Set the active movie to the one selected
  };

  return (
    <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
      <div className="max-w mx-auto">  {/* Cambiar aca para el ancho del componente */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} // Use setQuery to update query state
      className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300"
    >
      Go
    </button>
  </form>
        {/* Your existing UI components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {movies.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {activeMovie && (
          <MovieDetailsPopup
            movie={activeMovie}
            onClose={() => setActiveMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
