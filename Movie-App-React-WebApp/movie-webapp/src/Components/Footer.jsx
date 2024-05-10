import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-netflix-dark py-8 text-white">
      <div className="container mx-auto flex justify-center items-center">
        <div className="mr-6">
          <h3 className="text-lg font-bold mb-4 text-gray-400">Síguenos en redes sociales</h3>
          <div className="flex items-center space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-blue-500 text-gray-400 transition-colors duration-300" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-blue-400 text-gray-400 transition-colors duration-300" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-pink-500 text-gray-400 transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl hover:text-blue-700 text-gray-400 transition-colors duration-300" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-400">Contacto</h3>
          <p className="text-sm text-gray-400">Dirección: Av. Libertador 1849, Ciudad de Buenos Aires</p>
          <p className="text-sm text-gray-400">Teléfono: +123 456 789</p>
          <p className="text-sm text-gray-400">Email: movieapp@movieapp.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;