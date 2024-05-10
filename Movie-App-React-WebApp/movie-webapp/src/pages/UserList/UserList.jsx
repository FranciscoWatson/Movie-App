// UserList.jsx
import React, { useState, useEffect } from 'react';
import MovieCategoryRow from '../../Components/MovieCategoryRow';  // Adjust the path as needed
import { fetchMovieDetails } from "../../Services/ApiReference"; // Ensure the path is correct

const UserList = () => {
    const [lists, setLists] = useState({});

    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('userLists')) || {};
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const fetchAllMovies = async () => {
            const newLists = {};
            // Fetch movies for each custom list
            if (favorites.length) {
                const favoriteMovies = await Promise.all(favorites.map(id => fetchMovieDetails(id)));
                newLists['Favorites'] = favoriteMovies.filter(movie => movie !== null);
            }
            
            for (const [listName, movieIds] of Object.entries(storedLists)) {
                const movies = await Promise.all(movieIds.map(id => fetchMovieDetails(id)));
                newLists[listName] = movies.filter(movie => movie !== null);
            }

            console.log("New lists with movie details:", newLists);
            setLists(newLists);
        };

        fetchAllMovies();
    }, []);

    return (
        <div className="min-h-screen bg-netflix-dark text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">User Lists</h1>
            {Object.keys(lists).length > 0 ? Object.entries(lists).map(([listName, movies]) => (
                <MovieCategoryRow key={listName} title={listName} movies={movies} />
            )) : <p>No lists found or lists are empty.</p>}
        </div>
    );
};

export default UserList;
