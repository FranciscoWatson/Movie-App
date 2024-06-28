const API_KEY = "81b11a2b974891b65c1d7eb7fe785eb3";
const BASE_URL = "https://api.themoviedb.org/3";

const BASE_GENRE_URL = `${BASE_URL}/genre/movie/list`;
const BASE_PERSON_URL = `${BASE_URL}/search/person`;
const BASE_MOVIE_URL = `${BASE_URL}/search/movie`;
const BASE_COMPANY_URL = `${BASE_URL}/search/company`;
const BASE_DISCOVER_MOVIE_URL = `${BASE_URL}/discover/movie`;

const fetchMovies = async (query) => {
    const url = `${BASE_MOVIE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    let filteredMovies = data.results.filter(movie => movie.poster_path);
    return filteredMovies;
};

const fetchGenres = async () => {
    const url = `${BASE_GENRE_URL}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const fetchMovieGenres = async (selectedGenres) => {
    const genresString = selectedGenres.join(',');
    try {
        const url = `${BASE_DISCOVER_MOVIE_URL}?api_key=${API_KEY}&with_genres=${encodeURIComponent(genresString)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error al obtener las películas con los géneros seleccionados");
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error: ', error);
    }
};

const fetchMoviesByCategory = async (category) => {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    let filteredMovies = data.results.filter(movie => movie.poster_path);
    return filteredMovies;
};

const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch movie details:", error);
        return null;
    }
};

const fetchMoviesAdvanced = async (selectedGenres, actor, director, company) => {
    const genresString = selectedGenres.join(',');
    let url = `${BASE_DISCOVER_MOVIE_URL}?api_key=${API_KEY}&with_genres=${encodeURIComponent(genresString)}`;

    if (actor) {
        const actorResponse = await fetch(`${BASE_PERSON_URL}?api_key=${API_KEY}&query=${encodeURIComponent(actor)}`);
        const actorData = await actorResponse.json();
        if (actorData.results.length > 0) {
            const actorId = actorData.results[0].id;
            url += `&with_cast=${actorId}`;
        }
    }

    if (director) {
        const directorResponse = await fetch(`${BASE_PERSON_URL}?api_key=${API_KEY}&query=${encodeURIComponent(director)}`);
        const directorData = await directorResponse.json();
        if (directorData.results.length > 0) {
            const directorId = directorData.results[0].id;
            url += `&with_crew=${directorId}`;
        }
    }

    if (company) {
        const companyResponse = await fetch(`${BASE_COMPANY_URL}?api_key=${API_KEY}&query=${encodeURIComponent(company)}`);
        const companyData = await companyResponse.json();
        if (companyData.results.length > 0) {
            const companyId = companyData.results[0].id;
            url += `&with_companies=${companyId}`;
        }
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
};

export { fetchMovies, fetchGenres, fetchMovieGenres, fetchMoviesByCategory, fetchMovieDetails, fetchMoviesAdvanced };
