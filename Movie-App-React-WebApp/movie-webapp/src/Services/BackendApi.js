const BASE_URL = "http://localhost:3001/api/";

const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getUserLists = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}lists/${username}/lists`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getFavoriteList = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}users/${username}/favorites`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const addToFavorites = async (username, movieId) => {
    try {
        const response = await fetch(`${BASE_URL}users/${username}/addFavorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const createMovieList = async (username, listName) => {
    try {
        const response = await fetch(`${BASE_URL}lists/${username}/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listName })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteMovieList = async (username, listId) => {
    try {
        const response = await fetch(`${BASE_URL}lists/${username}/lists/${listId}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const addMovieToList = async (username, listName, movieId) => {
    try {
        const response = await fetch(`${BASE_URL}lists/${username}/lists/${listName}/addMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId })
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteMovieFromList = async (username, listId, movieId) => {
    try {
        const response = await fetch(`${BASE_URL}lists/${username}/lists/${listId}/movies/${movieId}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteUser = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}users/${username}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const updateUser = async (username, userData) => {
    try {
        const response = await fetch(`${BASE_URL}users/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const removeFromFavorites = async (username, movieId) => {
    try {
        const response = await fetch(`${BASE_URL}users/${username}/favorites/${movieId}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export {
    registerUser,
    loginUser,
    getUserLists,
    getFavoriteList,
    addToFavorites,
    createMovieList,
    deleteMovieList,
    addMovieToList,
    deleteMovieFromList,
    deleteUser,
    updateUser,
    removeFromFavorites
};
