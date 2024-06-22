import React, { useState, useEffect } from "react";
import { fetchMoviesByCategory } from "../../Services/ApiReference";
import MovieCategoryRow from "../../Components/MovieCategoryRow";
import MovieDetails from "../MovieSearch/Components/MovieDetails";
import { useAuth } from "../../Context/AuthContext";
import Carousel from "../LandingPage/Carrousel";


const LandingPage = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [activeMovie, setActiveMovie] = useState(null);

    const { authUser } = useAuth();

    useEffect(() => {
        fetchPopularMovies();
        fetchUpcomingMovies();
        fetchNowPlayingMovies();
        fetchTopRatedMovies();
    }, []);

    const fetchPopularMovies = async () => {
        const movies = await fetchMoviesByCategory("popular");
        setPopularMovies(movies);
    };

    const fetchUpcomingMovies = async () => {
        const movies = await fetchMoviesByCategory("upcoming");
        setUpcomingMovies(movies);
    };

    const fetchNowPlayingMovies = async () => {
        const movies = await fetchMoviesByCategory("now_playing");
        setNowPlayingMovies(movies);
    };

    const fetchTopRatedMovies = async () => {
        const movies = await fetchMoviesByCategory("top_rated");
        setTopRatedMovies(movies);
    };

    const handleMovieSelect = (movie) => {
        setActiveMovie(movie);
    };

    return (
        <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome! {authUser?.username}</h1>
            <div className="mb-8">
                <Carousel movies={popularMovies} /> {/* Añadimos el componente Carousel */}
            </div>
            <div className="space-y-8">
                <MovieCategoryRow title="Popular Movies" movies={popularMovies} onMovieSelect={handleMovieSelect} />
                <MovieCategoryRow title="Upcoming Movies" movies={upcomingMovies} onMovieSelect={handleMovieSelect} />
                <MovieCategoryRow title="Now Playing Movies" movies={nowPlayingMovies} onMovieSelect={handleMovieSelect} />
                <MovieCategoryRow title="Top Rated Movies" movies={topRatedMovies} onMovieSelect={handleMovieSelect} />
            </div>
            {activeMovie && (
                <MovieDetails
                    movie={activeMovie}
                    onClose={() => setActiveMovie(null)}
                />
            )}
        </div>
    );
};

export default LandingPage;
