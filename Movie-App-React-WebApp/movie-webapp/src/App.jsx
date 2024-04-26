import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import React, { useState } from 'react';
import './App.css';

import MovieSearch from "./pages/MovieSearch/MovieSearch";
import RegisterForm from "./pages/Register/RegisterForm";
import LoginForm from "./pages/Login/LoginForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./Components/NavBar";

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
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Register" element={<RegisterForm/>} />
          <Route path="/MovieSearch" element={<MovieSearch/>} />
          <Route path="/Login"element={<LoginForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
