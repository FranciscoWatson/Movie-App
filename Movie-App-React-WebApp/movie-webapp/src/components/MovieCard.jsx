import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
      <img src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'path/to/default/image.jpg'} alt={movie.title} className="w-full object-cover group-hover:opacity-50" />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300">Rating: {movie.vote_average || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
