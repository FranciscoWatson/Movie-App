import React, { useEffect, useState } from 'react';
import MovieUserListCategoryRow from './Components/MovieUserListCategoryRow';
import { useLists } from '../../Context/ListContext';
import { fetchMovieDetails } from "../../Services/ApiReference";

const UserList = () => {
    const { lists, favorites } = useLists();
    const [moviesByList, setMoviesByList] = useState({});
    
    useEffect(() => {
        const fetchAllMovies = async () => {
            const newLists = {};

            const favoriteMovies = await Promise.all(favorites.map(id => fetchMovieDetails(id)));
            newLists['Favorites'] = favoriteMovies.filter(movie => movie !== null);

            for (const listName in lists) {
                const movieIds = lists[listName];
                const movies = await Promise.all(movieIds.map(id => fetchMovieDetails(id)));
                newLists[listName] = movies.filter(movie => movie !== null);
            }

            setMoviesByList(newLists);
        };

        fetchAllMovies();
    }, [lists, favorites]);

    const handleRemoveMovie = (listName, movieId) => {
        setMoviesByList((prev) => ({
            ...prev,
            [listName]: prev[listName].filter((movie) => movie.id !== movieId),
        }));
    };

    return (
        <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">User Lists</h1>
            {Object.keys(moviesByList).length > 0 ? Object.entries(moviesByList).map(([listName, movies]) => (
                <MovieUserListCategoryRow
                    key={listName}
                    title={listName}
                    movies={movies}
                    onMovieSelect={(movie) => console.log(`Selected movie: ${movie.title}`)}
                    onRemove={(movieId) => handleRemoveMovie(listName, movieId)}
                />
            )) : <p>No lists found or lists are empty.</p>}
        </div>
    );
};

export default UserList;
