import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfilePage.css';
import useProfile from '../ProfileDataBackend/ProfileData.js';
import axios from 'axios';

export default function EditProfilePage() {
  const profile = useProfile();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setUsername(profile.username);
      setBio(profile.bio);
    }
  }, [profile]);

  // Function to handle form submission
  const handleSaveChanges = async(e) => {
    e.preventDefault();
    const formData = {
      updatedName: name,
      updatedUsername:username,
      updatedBio: bio,
    };

    //
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        if (token) {
          const response = await axios.put('http://localhost:2000/api/edit-profile', formData,{
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
          });


        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    //
  };

  // Function to handle cancel button
  const handleCancel = () => {
    setName(profile.name);
    setUsername(profile.username);
    setBio(profile.bio);
    console.log('Changes canceled');
  };


  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="profile-header mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="profile-picture img-thumbnail rounded-circle mb-3"
            />
            <button className="btn btn-secondary mb-4">Change Profile Picture</button>
          </div>

          <form className="form-group" onSubmit={handleSaveChanges}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
            <button type="button" className="btn btn-secondary btn-block" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}
