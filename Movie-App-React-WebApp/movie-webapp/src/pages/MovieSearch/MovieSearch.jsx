import React, { useState } from "react";
import MovieCard from "./Components/MovieCard";
import MovieDetails from "./Components/MovieDetails";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null); 
  const [genre, setGenre] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");

  const API_KEY = "81b11a2b974891b65c1d7eb7fe785eb3";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchMovies = async () => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
  
    let filteredMovies = data.results.filter(movie => movie.poster_path); // Filtrar películas sin imagen
  
    if (genre) {
      filteredMovies = filteredMovies.filter(movie => movie.genre_ids && movie.genre_ids.includes(parseInt(genre)));
    }
    if (actor) {
      // Agrega aquí el filtrado por actor si es necesario
    }
    if (director) {
      // Agrega aquí el filtrado por director si es necesario
    }
  
    return filteredMovies;
  };
  

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchedMovies = await fetchMovies();
    setMovies(searchedMovies);
  };

const handleMovieSelect = (movie) => {
  setActiveMovie(movie);
};


  return (
    <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
      <div className="max-w mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Actor"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-2">
          {movies.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {activeMovie && (
          <MovieDetails
            movie={activeMovie}
            onClose={() => setActiveMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MovieSearch;