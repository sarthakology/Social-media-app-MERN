
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        if (token) {
          const response = await axios.get('http://localhost:2000/api/user', {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
          });

          setProfile(response.data); // Set the fetched profile data to state
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run only on component mount

  return profile;
};

export default useProfile;



























// const profile = {
//     email: "sarthak@example.com",
//     password: "securepassword",
//     username: "sarthak_chauhan",
//     name: "sarthak",
//     bio: "Web developer",
//     profilePicture: "https://www.tecnicasreunidas.es/wp-content/uploads/2024/02/ai-generated-8479245_1920.jpg",
//     postCount: 22,
//     posts: [
//       "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J",
//       "https://media.4-paws.org/7/b/8/4/7b84da50b67c8c39b9deb0d6581efa3309960ed6/VIER%20PFOTEN_2019-12-13_209-2001x2000-600x600.jpg",
//       "https://t3.ftcdn.net/jpg/06/97/08/68/360_F_697086805_OU53BdEOOKPISshe70XxgcoH75XRESQ0.jpg",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300"
//     ],
//     followersCount: 0,
//     followers: [],
//     followingCount: 0,
//     following: [],
//     privacy: 0,
//   };
//   export default profile;