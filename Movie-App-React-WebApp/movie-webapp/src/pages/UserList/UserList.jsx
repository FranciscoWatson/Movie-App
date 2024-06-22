// UserList.jsx
import React, { useState, useEffect } from 'react';
import MovieCategoryRow from '../../Components/MovieCategoryRow';  // Adjust the path as needed
import { fetchMovieDetails } from "../../Services/ApiReference"; // Ensure the path is correct
import { getUserLists, getFavoriteList } from '../../Services/BackendApi';
import { useAuth } from "../../Context/AuthContext";

const UserList = () => {
    const [favorites, setFavorites] = useState([])
    const [lists, setLists] = useState([]);

    const { authUser } = useAuth();

    useEffect(() => {

        const fetchAllMovies = async () => {
            const newLists = {};
            const userLists = await getUserLists(authUser.username);
            const favoriteMoviesList = await getFavoriteList(authUser.username);

            setFavorites(favoriteMoviesList);
            setLists(userLists);

            const favoriteMovies = await Promise.all(favoriteMoviesList.map(id => fetchMovieDetails(id)));
            newLists['Favorites'] = favoriteMovies.filter(movie => movie !== null);
            
            for (const list of userLists) {
                const { name: listName, movies: movieIds } = list;
                const movies = await Promise.all(movieIds.map(id => fetchMovieDetails(id)));
                newLists[listName] = movies.filter(movie => movie !== null);
            }

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
