import React, { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import MovieDetails from "./Components/MovieDetails";
import GenreFilter from "./Components/GenreFilter";
import { fetchMovies, fetchGenres, fetchMovieGenres, fetchMoviesByCategory, fetchMoviesAdvanced } from "../../Services/ApiReference";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [company, setCompany] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const allGenres = await fetchGenres();
      setGenres(allGenres.genres);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popularMovies = await fetchMoviesByCategory("popular");
      setMovies(popularMovies);
    };

    fetchPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchedMovies = await fetchMovies(query);
    setMovies(searchedMovies);
  };

  const handleShowFilter = () => setShowFilter(true);

  const handleMovieSelect = (movie) => {
    setActiveMovie(movie);
  };

  const handleGenreChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const handleAdvancedSearch = async () => {
    const searchedMovies = await fetchMoviesAdvanced(selectedGenres, actor, director, company);
    setMovies(searchedMovies);
    // No cerramos el filtro avanzado
  };

  return (
    <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
      <div className="max-w mx-auto">
        <div>
          {!showFilter && (
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-800 bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300"
              >
                Search
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300"
                onClick={handleShowFilter}
              >
                Advanced Search
              </button>
            </form>
          )}
          {showFilter && (
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreChange={handleGenreChange}
              actor={actor}
              onActorChange={setActor}
              director={director}
              onDirectorChange={setDirector}
              company={company}
              onCompanyChange={setCompany}
              onSearch={handleAdvancedSearch}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-2">
          {movies.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {activeMovie && (
          <MovieDetails movie={activeMovie} onClose={() => setActiveMovie(null)} />
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
