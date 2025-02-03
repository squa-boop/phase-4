// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/users/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Display other profile information */}
    </div>
  );
};

export default Profile;
