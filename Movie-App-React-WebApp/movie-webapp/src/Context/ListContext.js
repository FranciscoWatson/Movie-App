// src/Context/ListContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserLists, getFavoriteList, addToFavorites, removeFromFavorites, addMovieToList, deleteMovieFromList } from '../Services/BackendApi';
import { useAuth } from './AuthContext';

const ListContext = createContext();

export const useLists = () => useContext(ListContext);

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState({});
  const [favorites, setFavorites] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchListsAndFavorites = async () => {
      if (authUser?.username) {
        try {
          const userLists = await getUserLists(authUser.username);
          const favoriteMovies = await getFavoriteList(authUser.username);

          const formattedLists = userLists.reduce((acc, list) => {
            acc[list.name] = list.movies;
            return acc;
          }, {});
          
          setLists(formattedLists);
          setFavorites(favoriteMovies);
        } catch (error) {
          console.error("Error fetching lists or favorites:", error);
        }
      }
    };

    fetchListsAndFavorites();
  }, [authUser]);

  const addToFavoritesList = async (movieId) => {
    if (!favorites.includes(movieId)) {
      try {
        await addToFavorites(authUser.username, movieId);
        setFavorites([...favorites, movieId]);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const removeFromFavoritesList = async (movieId) => {
    if (favorites.includes(movieId)) {
      try {
        await removeFromFavorites(authUser.username, movieId);
        setFavorites(favorites.filter(id => id !== movieId));
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };

  const addMovieToListByName = async (listName, movieId) => {
    if (!lists[listName]?.includes(movieId)) {
      try {
        await addMovieToList(authUser.username, listName, movieId);
        setLists({
          ...lists,
          [listName]: [...(lists[listName] || []), movieId]
        });
      } catch (error) {
        console.error(`Error adding movie to ${listName}:`, error);
      }
    }
  };

  const removeMovieFromListByName = async (listName, movieId) => {
    if (lists[listName]?.includes(movieId)) {
      try {
        const listId = Object.keys(lists).find(key => lists[key].includes(movieId));
        await deleteMovieFromList(authUser.username, listId, movieId);
        setLists({
          ...lists,
          [listName]: lists[listName].filter(id => id !== movieId)
        });
      } catch (error) {
        console.error(`Error removing movie from ${listName}:`, error);
      }
    }
  };

  return (
    <ListContext.Provider value={{ lists, favorites, addToFavoritesList, removeFromFavoritesList, addMovieToListByName, removeMovieFromListByName }}>
      {children}
    </ListContext.Provider>
  );
};
