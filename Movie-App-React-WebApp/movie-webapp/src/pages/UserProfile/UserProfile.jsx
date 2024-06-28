import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import genericAvatar from '../../assets/user.jpg'; // Asegúrate de que la ruta sea correcta

const UserProfile = () => {
  const { authUser } = useAuth();
  const [user, setUser] = useState(authUser || {});

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  return (
    <div className="bg-netflix-dark min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={user.avatarUrl || genericAvatar}
                alt="Avatar"
                className="h-40 w-40 rounded-full object-cover border-4 border-netflix-red"
              />
            </div>
            {/* Información del perfil */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-400 mb-2">username: @{user.username}</p>
              <p className="text-sm text-gray-400 mb-2">email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
