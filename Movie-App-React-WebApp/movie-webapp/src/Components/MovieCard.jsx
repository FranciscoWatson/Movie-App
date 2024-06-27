// src/Components/MovieCard.jsx
import React, { useState, useEffect } from "react";
import { useLists } from "../Context/ListContext";
import { useAuth } from "../Context/AuthContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onCardClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const { lists, favorites, addToFavoritesList, removeFromFavoritesList, addMovieToListByName } = useLists();
  const { authUser } = useAuth();

  useEffect(() => {
    setIsFavorite(favorites.includes(movie.id));
  }, [favorites, movie.id]);

  const handleToggleFavorite = async (event) => {
    event.stopPropagation();
    if (isFavorite) {
      await removeFromFavoritesList(movie.id);
    } else {
      await addToFavoritesList(movie.id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToList = async (event) => {
    event.stopPropagation();
    if (selectedList && lists[selectedList] && !lists[selectedList].includes(movie.id)) {
      await addMovieToListByName(selectedList, movie.id);
    }
  };

  const handleCreateNewList = async (event) => {
    event.stopPropagation();
    if (selectedList && !lists[selectedList]) {
      try {
        await createMovieList(authUser.username, selectedList);
        await addMovieToListByName(selectedList, movie.id);
      } catch (error) {
        console.error("Error creating new list or adding movie:", error);
      }
    } else {
      alert('List already exists or invalid name.');
    }
  };

  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform hover:scale-105 transition-transform duration-300" onClick={onCardClick}>
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'path/to/default/image.jpg'}
        alt={movie.title}
        className="w-full object-cover group-hover:opacity-50 transition-opacity duration-300"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-bold text-white mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-300 mb-4">Rating: {movie.vote_average || "N/A"}</p>
        <button onClick={handleToggleFavorite} className={`mt-2 px-4 py-2 rounded-full text-sm font-medium ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-300`}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
        <div className="mt-4 w-full space-y-2">
          <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-700 text-white rounded-md cursor-pointer">
            <option value="">Select a list</option>
            {Object.keys(lists).map((list) => (
              <option key={list} value={list}>{list}</option>
            ))}
          </select>
          <button onClick={handleAddToList} className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white transition duration-300">Add to List</button>
          <input type="text" placeholder="New list name" value={selectedList} onChange={(e) => setSelectedList(e.target.value)} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-700 text-white rounded-md"/>
          <button onClick={handleCreateNewList} className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white transition duration-300">Create New List</button>
        </div>
      </div>
      <h3 className="text-center py-2 bg-black text-white">{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
