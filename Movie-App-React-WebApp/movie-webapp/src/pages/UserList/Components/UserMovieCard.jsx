import React from "react";
import { useLists } from "../../../Context/ListContext";
import { removeFromFavorites, deleteMovieFromList } from "../../../Services/BackendApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const UserMovieCard = ({ movie, listName, onRemove }) => {
  const { removeMovieFromListByName, removeFromFavoritesList } = useLists();

  const handleRemove = async (event) => {
    event.stopPropagation();
    if (listName === 'Favorites') {
      await removeFromFavoritesList(movie.id);
      await removeFromFavorites(movie.id);
    } else {
      await removeMovieFromListByName(listName, movie.id);
    }
    onRemove(movie.id);
  };

  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform hover:scale-105 transition-transform duration-300">
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'path/to/default/image.jpg'}
        alt={movie.title}
        className="w-full object-cover group-hover:opacity-50 transition-opacity duration-300"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-bold text-white mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-300 mb-4">Rating: {movie.vote_average || "N/A"}</p>
        <button onClick={handleRemove} className="mt-2 px-4 py-2 rounded-full text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition duration-300">
          Remove
        </button>
      </div>
      <h3 className="text-center py-2 bg-black text-white">{movie.title}</h3>
    </div>
  );
};

export default UserMovieCard;
