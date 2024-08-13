import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../Context.js';

const SearchProfile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const { setSearchUserName } = useContext(UserContext);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/find/${username}`);
      setSearchUserName(username)
      setProfile(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Profile not found');
        setProfile(null);
      } else {
        setError('An error occurred');
        setProfile(null);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSearch}>
            Search
          </button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {profile && !error && (
            <div className="mt-3">
              <h2>{profile.username}</h2>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              {profile.profilePicture && (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="img-fluid"
                />
              )}
              <Link to={"/search/user"} className="btn btn-info mt-3">
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
