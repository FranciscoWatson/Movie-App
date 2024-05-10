import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, setAuthUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setAuthUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authUser');
  };

  return (
    <div className="bg-netflix-dark text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold hover:text-netflix-red">
          MovieApp
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white hover:text-netflix-red focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Link
            to="/moviesearch"
            onClick={() => setIsOpen(false)}
            className="hover:bg-netflix-red px-4 py-2 rounded block md:inline-block"
          >
            Search Movies
          </Link>
          <Link
            to="/userlists"
            onClick={() => setIsOpen(false)}
            className="hover:bg-netflix-red px-4 py-2 rounded block md:inline-block"
          >
            User Lists
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="hover:bg-netflix-red px-4 py-2 rounded block md:inline-block"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;