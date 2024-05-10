import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MovieSearch from './pages/MovieSearch/MovieSearch';
import RegisterForm from './pages/Register/RegisterForm';
import LoginForm from './pages/Login/LoginForm';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './Components/NavBar';
import { AuthProvider } from './Context/AuthContext';
import AuthGuard from './Guards/AuthGuard';
import UserList from './pages/UserList/UserList';
import UserProfile from './pages/UserProfile/UserProfile';
import Footer from './Components/Footer'; // Importa el componente Footer

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/Register" element={<RegisterForm />} />
            <Route element={<AuthGuard />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/MovieSearch" element={<MovieSearch />} />
              <Route path="/UserLists" element={<UserList />} />
              <Route path="/Profile" element={<UserProfile />} />
            </Route>
          </Routes>
          <Footer /> {/* Agrega el componente Footer al final del Router */}
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;