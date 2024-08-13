import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Navbar from './Navbar/Navbar';
import SigninPage from "./SigninPage/SigninPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import SearchProfile from "./SearchPage/SearchProfile";
import SearchProfilePage from "./SearchProfilePage/SearchProfilePage";
import { UserContext } from '../Context.js';
import EditProfilePage from './EditProfilePage/EditProfilePage.jsx';


const AppRoutes = () => {
    const { searchUserName } = useContext(UserContext);

    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<SigninPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<><Navbar /><HomePage /></>} />
                <Route path="/profile" element={<><Navbar /><UserProfilePage /></>} />
                <Route path="/search" element={<><Navbar /><SearchProfile/></>} />
                <Route path={"/search/user"} element={<><Navbar /><SearchProfilePage username={searchUserName}/></>} />
                <Route path="/editProfile" element={<><Navbar /><EditProfilePage/></>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
