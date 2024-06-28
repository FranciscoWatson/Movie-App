import React, { useState } from "react";

const GenreFilter = ({ genres, selectedGenres, onGenreChange, actor, onActorChange, director, onDirectorChange, company, onCompanyChange, onSearch, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  const handleRemoveTag = (genreId) => {
    onGenreChange(selectedGenres.filter(id => id !== genreId));
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg relative">
      <div className="flex items-start">
        <div className="relative mr-6">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
          >
            Select Genres
          </button>
          {isDropdownOpen && (
            <ul className="absolute mt-2 bg-gray-700 text-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
              {genres.map((currentGenre) => (
                <li
                  key={currentGenre.id}
                  className={`p-2 cursor-pointer rounded-lg ${selectedGenres.includes(currentGenre.id) ? 'bg-gray-600' : 'hover:bg-gray-500'}`}
                  onClick={() => handleItemClick(currentGenre.id)}
                >
                  {currentGenre.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-grow flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for an Actor"
            value={actor}
            onChange={(e) => onActorChange(e.target.value)}
            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />
          <input
            type="text"
            placeholder="Search for Director"
            value={director}
            onChange={(e) => onDirectorChange(e.target.value)}
            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />
          <input
            type="text"
            placeholder="Search for a Company"
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap space-x-2">
        {selectedGenres.map((genreId) => {
          const genre = genres.find(g => g.id === genreId);
          return (
            <div key={genreId} className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center space-x-2">
              <span>{genre.name}</span>
              <button onClick={() => handleRemoveTag(genreId)} className="text-red-500 hover:text-red-700">
                &times;
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className="mt-4 px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300" onClick={onSearch}>
        Search
      </button>
      <button type="button" className="mt-4 px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default GenreFilter;
