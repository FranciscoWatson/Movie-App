import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative transform transition duration-300 hover:scale-105">
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden"> 
        {movie.poster_path ? (
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover group-hover:opacity-75" />
        ) : (
          <div className="h-full bg-gray-700 text-gray-400 flex items-center justify-center text-sm">No Image Available</div>
        )}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div>
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">Release: {movie.release_date || "N/A"}</p>
          <p className="text-sm text-gray-300">Rating: {movie.vote_average || "N/A"}</p>
          <p className="mt-2 text-xs text-gray-300">{movie.overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
