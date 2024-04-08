import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import React, { useState } from 'react';
import './App.css';

import MovieSearch from "./pages/MovieSearch/MovieSearch";
import RegisterForm from "./pages/Register/RegisterForm";
import LoginForm from "./pages/Login/LoginForm";

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
      <BrowserRouter>
        <h1>Movie Search App</h1>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/Register" element={<RegisterForm/>} />
          <Route path="/MovieSearch" element={<MovieSearch/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
