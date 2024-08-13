import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';
import useProfile from '../ProfileDataBackend/ProfileData.js';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const navigate = useNavigate() 
  const profile = useProfile();
  if (!profile) {
    return <div>Loading...</div>;
  }
  const HandleEditProfileButton = () =>{
    navigate('/editProfile');

  }

  return (
    <div className='bg'>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="profile-header d-flex align-items-center mb-4">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="profile-picture img-thumbnail rounded-circle"
              />
              <div className="ml-4">
                <h2 className="mb-0">{profile.username}</h2>
                <p>{profile.name}</p>
                <p>{profile.bio}</p>
              </div>
              <div className="ml-auto text-right">
                <div><strong>{profile.postCount}</strong> posts</div>
                <div><strong>{profile.followersCount}</strong> followers</div>
                <div><strong>{profile.followingCount}</strong> following</div>
              </div>
            </div>

            <div className="d-flex justify-content-between mb-4 button-group">
              <button className="btn btn-primary btn-long" onClick={HandleEditProfileButton}>Edit profile</button>
            </div>

              <div className="profile-posts">
                <div className="row">
                  {profile.posts.map((post, index) => (
                    <div className="col-4 mb-4" key={index}>
                      <img src={post} alt={`Post ${index + 1}`} className="img-fluid" />
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
