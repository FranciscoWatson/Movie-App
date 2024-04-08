// LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al backend
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-700 text-white"
      />
      <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-300">
        Login
      </button>
    </form>
  );
};

export default LoginForm;