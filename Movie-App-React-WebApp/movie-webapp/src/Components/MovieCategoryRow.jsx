import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';

const MovieCategoryRow = ({ title, movies }) => {
    const scrollRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);

    const checkScrollable = () => {
        const { current } = scrollRef;
        if (current) {
            setIsScrollable(current.scrollWidth > current.clientWidth);
        }
    };

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative mb-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {isScrollable && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 z-10 inline-flex items-center justify-center w-8 h-32 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-60 cursor-pointer hover:bg-opacity-75"
                        aria-label="Scroll left"
                    >
                        &#9664;
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 z-10 inline-flex items-center justify-center w-8 h-32 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-60 cursor-pointer hover:bg-opacity-75"
                        aria-label="Scroll right"
                    >
                        &#9654;
                    </button>
                </>
            )}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto py-4 space-x-4 scrollbar-hide pl-8 pr-8"
                style={{ scrollBehavior: 'smooth' }}
                onLoad={checkScrollable}
                onScroll={checkScrollable}
            >
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="min-w-[140px] max-w-[240px] flex-shrink-0">
                            <MovieCard movie={movie} />
                        </div>
                    ))
                ) : (
                    <p>No movies in this list.</p>
                )}
            </div>
        </div>
    );
};

export default MovieCategoryRow;