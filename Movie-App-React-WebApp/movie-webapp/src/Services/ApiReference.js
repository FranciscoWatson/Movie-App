const API_KEY = "81b11a2b974891b65c1d7eb7fe785eb3";
const BASE_URL = "https://api.themoviedb.org/3";

const BASE_GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";
const BASE_PERSON_URL = "https://api.themoviedb.org/3/search/person/search/person";
const BASE_MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
const BASE_COMPANY_URL = "https://api.themoviedb.org/3/search/company";
const BASE_DISCOVER_MOVIE_URL = "https://api.themoviedb.org/3/discover/movie";

const fetchMovies = async (query) => {
    const url = `${BASE_MOVIE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
  
    let filteredMovies = data.results.filter(movie => movie.poster_path); // Filtrar películas sin imagen
  
    return filteredMovies;
};

const fetchGenres = async () =>{
    const url = `${BASE_GENRE_URL}?api_key=${API_KEY}`
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const fetchMovieGenres = async (selectedGenres) => {
    const genresString = selectedGenres.join(',');
    try{
        const url = `${BASE_DISCOVER_MOVIE_URL}?api_key=${API_KEY}&with_genres=${encodeURIComponent(genresString)}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Error al obtener las peliculas con los generos seleccionados");
        }

        const data = await response.json();
        return data.results;
    }catch (error){
        console.error('Error: ', error);
    }
}

export {fetchMovies, fetchGenres, fetchMovieGenres};