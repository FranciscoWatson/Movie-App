import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


    navigate("/Login");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div className="bg-netflix-dark min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition duration-300">
          Register
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center cursor-pointer" onClick={handleLoginClick}>
          Already have an account? Login here
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;