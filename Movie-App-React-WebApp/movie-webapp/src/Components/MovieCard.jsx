import React, { useState, useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [lists, setLists] = useState({});

  useEffect(() => {
    // Cargar estado de favoritos y listas del usuario al inicializar
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(movie.id));

    const userLists = JSON.parse(localStorage.getItem('userLists')) || {};
    setLists(userLists);
  }, [movie.id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const filteredFavorites = favorites.filter(id => id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
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
    if (selectedList && !lists[selectedList]) {
      const newLists = { ...lists, [selectedList]: [] };
      localStorage.setItem('userLists', JSON.stringify(newLists));
      setLists(newLists);
      alert(`List '${selectedList}' created successfully!`);
    } else {
      alert('List already exists or invalid name.');
    }
  };
  

  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'path/to/default/image.jpg'}
        alt={movie.title}
        className="w-full object-cover group-hover:opacity-50"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">Rating: {movie.vote_average || "N/A"}</p>
          {/* Botón para agregar a favoritos */}
          <button
            onClick={handleToggleFavorite}
            className={`mt-2 p-2 text-sm ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          {/* Selección de lista y botón para agregar a lista */}
          <div className="mt-2">
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="p-2 bg-gray-700 text-white"
            >
              <option value="">Select a list</option>
              {Object.keys(lists).map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))}
            </select>
            <button onClick={handleAddToList} className="p-2 bg-blue-500 text-white">
              Add to List
            </button>
          </div>
          {/* Creación de nueva lista */}
          <div className="mt-2">
            <input
              type="text"
              placeholder="New list name"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="p-1 bg-gray-700 text-white"
            />
            <button onClick={handleCreateNewList} className="p-2 bg-green-500 text-white">
              Create New List
            </button>
          </div>
        </div>
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
