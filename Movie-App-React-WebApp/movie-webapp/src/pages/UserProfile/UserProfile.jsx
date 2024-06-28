import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

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
            <div className="flex justify-center">
              <img
                src={user.avatarUrl || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="h-40 w-40 rounded-full object-cover border-4 border-netflix-red"
              />
            </div>
            {/* Información del perfil */}
            <div className="text-center mt-6">
              <h2 className="text-3xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-400">username: @{user.username}</p>
              <p className="text-sm text-gray-400">email: {user.email}</p>
              <p className="text-sm text-gray-300 mt-4">{user.bio}</p>
              <p className="text-sm text-gray-300 mt-4">
                <strong>Location:</strong> {user.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
