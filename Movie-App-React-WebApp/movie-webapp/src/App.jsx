import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import React, { useState } from 'react';
import './App.css';

import MovieSearch from "./pages/MovieSearch/MovieSearch";
import RegisterForm from "./pages/Register/RegisterForm";
import LoginForm from "./pages/Login/LoginForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./Components/NavBar";
import { AuthProvider } from "./Context/AuthContext";
import AuthGuard from "./Guards/AuthGuard";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
            <Routes><Route path="/Login"element={<LoginForm/>} />
            <Route path="/Register" element={<RegisterForm/>} />
            <Route element={<AuthGuard/>}>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/MovieSearch" element={<MovieSearch/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
