import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const NavBar = () => {

    const {authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn} = useAuth(); 

    if(!isLoggedIn){
        return null;
    }

    const handleSignOut = () =>{
        setIsLoggedIn(false);
        setAuthUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authUser');
    }

    return (
        <div className="bg-netflix-dark text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">
                <Link to="/" className="hover:text-netflix-red">MovieApp</Link>
            </h1>
            <div>
                <Link to="/moviesearch" className="mx-2 p-2 hover:bg-netflix-red rounded">Search Movies</Link> 
                <Link to="/userlists" className="mx-2 p-2 hover:bg-netflix-red rounded">User Lists</Link>
                <Link to="/profile" className="mx-2 p-2 hover:bg-netflix-red rounded">Profile</Link>
                <button className="px-4 py-2 bg-netflix-red hover:bg-red-700 rounded-lg transition duration-300" onClick={() => {handleSignOut()}}>Log Out</button>
            </div>
        </div>
    );
};

export default NavBar;
