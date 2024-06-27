// src/pages/UserList/UserList.jsx
import React, { useEffect, useState } from 'react';
import MovieCategoryRow from '../../Components/MovieCategoryRow';
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

    return (
        <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">User Lists</h1>
            {Object.keys(moviesByList).length > 0 ? Object.entries(moviesByList).map(([listName, movies]) => (
                <MovieCategoryRow key={listName} title={listName} movies={movies} />
            )) : <p>No lists found or lists are empty.</p>}
        </div>
    );
};

export default UserList;
