import React, { useState } from 'react';
import './App.css';
import MovieSearch from './components/MovieSearch';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm'; 

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = (userData) => {
    console.log("Registrando usuario:", userData);
    setIsRegistered(true);
  };

  const handleLogin = (userData) => {
    console.log("Iniciando sesión:", userData);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      {!isRegistered ? (
        <RegisterForm onRegister={handleRegister} />
      ) : !isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <MovieSearch />
      )}
    </div>
  );
}

export default App;
