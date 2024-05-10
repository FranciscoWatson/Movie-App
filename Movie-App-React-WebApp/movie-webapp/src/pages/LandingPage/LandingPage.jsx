import React, { useState, useEffect } from "react";
import { fetchMoviesByCategory } from "../../Services/ApiReference";
import MovieCategoryRow from "../../Components/MovieCategoryRow";
const LandingPage = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);


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


    return (
        <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome!</h1>
            <MovieCategoryRow title="Popular Movies" movies={popularMovies} />
            <MovieCategoryRow title="Upcoming Movies" movies={upcomingMovies} />
            <MovieCategoryRow title="Now Playing Movies" movies={nowPlayingMovies} />
            <MovieCategoryRow title="Top Rated Movies" movies={topRatedMovies} />
        </div>
    );
};
export default LandingPage;