import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="bg-netflix-dark text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">
                <Link to="/" className="hover:text-netflix-red">MovieApp</Link>
            </h1>
            <div>
                <Link to="/moviesearch" className="mx-2 p-2 hover:bg-netflix-red rounded">Search Movies</Link> 
                <Link to="/userlists" className="mx-2 p-2 hover:bg-netflix-red rounded">User Lists</Link>
                <Link to="/profile" className="mx-2 p-2 hover:bg-netflix-red rounded">Profile</Link>
            </div>
        </div>
    );
};

export default NavBar;
