import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import axios from 'axios';


export default function SearchProfilePage({username}) {

    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);


    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/api/find/${username}`);
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

    useEffect(() => {
        handleSearch();
    }, []);

    if (!profile && !error) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg">
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        {error ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : (
                            <>
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
                                {profile.privacy !==1?(

                                    <div className="d-flex justify-content-between mb-4 button-group">
                                    <button className="btn btn-primary btn-long">Follow</button>
                                    <button className="btn btn-light btn-long">Message</button>
                                    </div>
                                    ):(
                                    <div className="d-flex justify-content-between mb-4 button-group">
                                    <button className="btn btn-primary btn-long">Follow</button>
                                    </div>

                                )}
                                {profile.privacy !== 1 ? (
                                    <div className="profile-posts">
                                        <div className="row">
                                            {profile.posts.map((post, index) => (
                                                <div className="col-4 mb-4" key={index}>
                                                    <img src={post} alt={`Post ${index + 1}`} className="img-fluid" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center mt-4">
                                        <h1>PRIVATE ACCOUNT</h1>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
