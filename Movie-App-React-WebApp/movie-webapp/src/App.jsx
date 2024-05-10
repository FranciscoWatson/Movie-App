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
import UserProfile from './pages/UserProfile/UserProfile'; // Importamos el componente UserProfile

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
              {/* Nueva ruta para mostrar el perfil del usuario */}
              <Route path="/Profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
