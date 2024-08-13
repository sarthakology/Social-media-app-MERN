const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },
    postCount: {
        type: Number,
        default: 0
    },
    posts: {
        type: [String], // Array of URLs
        default: []
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followers: {
        type: [String], // Array of usernames
        default: []
    },
    followingCount: {
        type: Number,
        default: 0
    },
    following: {
        type: [String], // Array of usernames
        default: []
    },
    privacy: {
        type: Number, // 1 for private, 0 for public
        default: 0
    }
});

const Profile = mongoose.model('Profile', UserSchema);

module.exports = Profile;
