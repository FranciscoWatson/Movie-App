import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../../Services/BackendApi";

const LoginForm = ({ onLogin }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn} = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí realiza la solicitud a tu API
      const response = await loginUser({username, password});
      console.log(response);
      console.log(response.user.username);

      setIsLoggedIn(true);
      setAuthUser({
        "username": response.user.username,
        "firstname": response.user.firstName,
        "lastname": response.user.lastName
      });
      navigate("/");

    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  

  const handleRegisterClick = () => {
    navigate("/Register"); // Redirige al formulario de registro al hacer clic en el enlace
  };

  return (
    <div className="bg-netflix-dark min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition duration-300">
          Login
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center cursor-pointer" onClick={handleRegisterClick}>
          Not registered yet? Register here
        </p>
      </form>
    </div>
  );
};

export default LoginForm;