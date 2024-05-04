// MovieCard.jsx
import React, { useState, useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const [lists, setLists] = useState({});
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    // Fetch available lists from localStorage
    const fetchedLists = JSON.parse(localStorage.getItem('userLists')) || {};
    setLists(fetchedLists);
  }, []);

  const handleFavoriteToggle = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (favorites.includes(movie.id)) {
          const filteredFavorites = favorites.filter(id => id !== movie.id);
          localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      } else {
          favorites.push(movie.id);
          localStorage.setItem('favorites', JSON.stringify(favorites));
      }
  };

  const handleAddToList = () => {
    if (selectedList && lists[selectedList]) {
      const updatedList = new Set([...lists[selectedList], movie.id]);
      const newLists = { ...lists, [selectedList]: Array.from(updatedList) };
      localStorage.setItem('userLists', JSON.stringify(newLists));
      alert(`Movie added to ${selectedList}`);
    }
  };

  const handleCreateNewList = () => {
    if (newListName && !lists[newListName]) {
      const newLists = { ...lists, [newListName]: [] };
      localStorage.setItem('userLists', JSON.stringify(newLists));
      setLists(newLists);
      setSelectedList(newListName); // Set newly created list as selected
      setNewListName(''); // Clear input field
      alert(`List '${newListName}' created successfully!`);
    } else {
      alert('List already exists or invalid name.');
    }
  };

  const isFavorite = JSON.parse(localStorage.getItem('favorites'))?.includes(movie.id);

  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
      <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'path/to/default/image.jpg'} alt={movie.title} className="w-full object-cover group-hover:opacity-50" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">Rating: {movie.vote_average || "N/A"}</p>
          <button onClick={handleFavoriteToggle} className={`mt-2 p-2 text-sm ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <div>
            <select value={selectedList} onChange={e => setSelectedList(e.target.value)} className="mt-2 p-2 bg-gray-700 text-white">
              <option value="">Select a list</option>
              {Object.keys(lists).map(list => (
                <option key={list} value={list}>{list}</option>
              ))}
            </select>
            <button onClick={handleAddToList} className="p-2 bg-blue-500 text-white">Add to List</button>
            <div className="mt-2">
              <input
                type="text"
                placeholder="New list name"
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                className="p-1 bg-gray-700 text-white"
              />
              <button onClick={handleCreateNewList} className="p-2 bg-green-500 text-white">Create New List</button>
            </div>
          </div>
        </div>
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
