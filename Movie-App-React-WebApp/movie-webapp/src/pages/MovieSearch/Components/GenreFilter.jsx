import React from "react";

const GenreFilter = ({ genres, selectedGenres, onGenreChange,  onClose}) => {
  const handleCheckboxChange = (event) => {
    const genreId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      onGenreChange([...selectedGenres, genreId]);
    } else {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex items-start">
        <ul className="space-y-2 mr-6">
          {genres.map((currentGenre) => (
            <li key={currentGenre.id} className="flex items-center">
              <input
                type="checkbox"
                id={currentGenre.id}
                value={currentGenre.id}
                onChange={handleCheckboxChange}
                checked={selectedGenres.includes(currentGenre.id)}
                className="w-4 h-4 text-netflix-red bg-gray-700 border-gray-600 focus:ring-netflix-red"
              />
              <label htmlFor={currentGenre.id} className="ml-2 text-sm cursor-pointer">
                {currentGenre.name}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex flex-col flex-grow space-y-4 h-full">
          <input
            type="text"
            placeholder="Search for an Actor"

            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />

          <input
            type="text"
            placeholder="Search for Director"
            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />

          <input
            type="text"
            placeholder="Search for a Company"
            className="p-2 outline-none rounded-lg focus:ring-2 focus:ring-netflix-red focus:bg-gray-700 bg-gray-600 text-white placeholder-gray-400 flex-grow"
          />
        </div>
      </div>

      <button type="button" className="mt-4 px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default GenreFilter;