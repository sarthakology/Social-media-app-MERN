import React from 'react';
import { Link } from 'react-router-dom';
import useProfile from '../ProfileDataBackend/ProfileData.js';

export default function Navbar() {
  const profile = useProfile();

  if (!profile) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">INSTAGRAM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/messages">Messages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/create-post">Create Post</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">Hey! {profile.name}</span>
            <button className="btn btn-outline-light rounded-circle p-0" style={{ width: '40px', height: '40px' }} type="button">
              <Link to="/profile">
                <img src={profile.profilePicture} alt="Profile icon" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
