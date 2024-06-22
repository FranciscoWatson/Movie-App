import React, { useEffect, useState, useRef } from 'react';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; // Cambiado a original para mejor resolución

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    };

    timeoutRef.current = setTimeout(nextSlide, 5000); // Aumentado el tiempo de espera a 5 segundos

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, movies.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden"> {/* Aumentado la altura a 500px */}
      <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {movies.map((movie, index) => (
          <div key={movie.id} className="w-full flex-shrink-0">
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4">
              <h3 className="text-lg font-bold text-white">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <button
          onClick={() => setCurrentIndex(currentIndex === 0 ? movies.length - 1 : currentIndex - 1)}
          className="bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          {"<"}
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % movies.length)}
          className="bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
