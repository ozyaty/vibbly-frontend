import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';

function Profile({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/users/me/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success !== false) {
          setProfile(data);
        } else {
          console.error("Profile fetch failed:", data.error);
        }
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
      });
  }, [userId]);

  if (!profile) return <p>Loading profile…</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Profile</h2>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.first_name}</p>
      <p><strong>Username:</strong> {profile.username}</p>
    </div>
  );
}

export default Profile;
