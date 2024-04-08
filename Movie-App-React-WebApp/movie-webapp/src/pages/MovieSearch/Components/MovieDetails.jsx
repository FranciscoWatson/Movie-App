import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden max-w-2xl w-full">
        <div className="flex flex-col md:flex-row">
          {movie.poster_path && (
            <div className="md:w-1/2">
              <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="object-cover w-full h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg" />
            </div>
          )}
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-400">{movie.overview || "No overview available."}</p>
            <div className="mt-4 flex items-center">
              <p className="mr-4">Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;