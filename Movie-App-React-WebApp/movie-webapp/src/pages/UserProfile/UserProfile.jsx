import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Nicolas Fernandez',
    username: 'nfernandez',
    email: 'nicofernandez@gmail.com',
    bio: 'Cat lover and movie fan',
    location: 'Buenos Aires, ARG',
    avatarUrl: 'https://media.licdn.com/dms/image/C4E03AQE0bScvNrgq-A/profile-displayphoto-shrink_800_800/0/1623870053114?e=1720656000&v=beta&t=tya3XOWpn_8gHpXf-Q8CnHcNq7UmR8Spl267rUcPMPI',
    currentPassword: '', // Nuevo estado para la contraseña actual
    newPassword: '', // Nuevo estado para la nueva contraseña
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para verificar la contraseña actual y actualizarla
    // Por ejemplo, puedes comparar user.currentPassword con la contraseña almacenada en tu base de datos

    // Después de verificar y actualizar la contraseña, puedes restablecer los campos
    setUser((prevUser) => ({
      ...prevUser,
      currentPassword: '',
      newPassword: '',
    }));

    alert('Password updated successfully!');
  };

  return (
    <div className="bg-netflix-dark min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            {/* Avatar */}
            <div className="flex justify-center">
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="h-40 w-40 rounded-full object-cover border-4 border-netflix-red"
              />
            </div>
            {/* Información del perfil */}
            <div className="text-center mt-6">
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-400">@{user.username}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-300 mt-4">{user.bio}</p>
              <p className="text-sm text-gray-300 mt-4">
                <strong>Location:</strong> {user.location}
              </p>
              {/* Formulario para cambiar la contraseña */}
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm text-gray-400 mb-2">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={user.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-netflix-red"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm text-gray-400 mb-2">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-netflix-red"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-netflix-red text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserProfile;
