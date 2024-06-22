import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/BackendApi";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if(username.length === 0 || username.length === 0 || username.length === 0 || username.length === 0 || username.length === 0 || username.length === 0){
      setErrorMessage('Todos los campos son obligatorios');
      setError(true);
      return false;
    }else if(password !== confirmPassword){
      setErrorMessage('Las contraseñas no coinciden');
      setError(true);
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateForm()){
  
      try{
        const response = await registerUser({
          "username": username,
          "email": email,
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
          "location": " ",
          "bio": ""
        })
      }catch(error){
        console.log("entre");
        setErrorMessage('Error al crear usuario: Nombre de Usuario invalido');
        setError(true);
        return;
      }
  
      navigate("/Login");
    }
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
          onChange={(e) => {
            setError(false);
            setUsername(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setError(false);
            setEmail(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setError(false);
            setFirstName(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setError(false);
            setLastName(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setError(false);
            setPassword(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setError(false);
            setConfirmPassword(e.target.value)
          }}
          className="block w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-yellow-400 transition duration-300 bg-gray-800 text-white"
        />

        {error && <div className="bg-orange-600 text-white p-3 mb-4 ">
                  {errorMessage}
                </div>}

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