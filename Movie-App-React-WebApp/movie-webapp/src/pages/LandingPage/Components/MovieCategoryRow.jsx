import React from 'react';
import MovieCard from "../../MovieSearch/Components/MovieCard";

const MovieCategoryRow = ({ title, movies }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex overflow-x-scroll py-4 space-x-4 scrollbar-hide">
                {movies.map(movie => (
                    <div key={movie.id} className="min-w-[140px] max-w-[240px] shrink-0">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCategoryRow;