// RegisterForm.jsx
import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos de registro al backend
    onRegister({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-700 text-white"
      />
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;