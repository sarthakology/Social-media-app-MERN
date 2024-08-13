// Import required modules
const router = require('express').Router(); // Creates a new router object to handle routes
const bcrypt = require('bcryptjs'); // Library for hashing and comparing passwords
const CreateUser = require('../models/CreateUser.js');
const jwt = require('jsonwebtoken'); // Library for generating and verifying JSON Web Tokens (JWT)
require('dotenv').config(); // Load environment variables from the .env file

const JWT_SECRET = process.env.JWT_SECRET; // Access the JWT secret from environment variables

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
    const salt = await bcrypt.genSalt(10);// Generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);    // Hash the user's password using the generated salt

    // Create a new user instance with the hashed password
    const newUser = new CreateUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    const response = await newUser.save();    // Save the new user to the database

    const { password, ...data } = await response.toJSON();    // Exclude the password field from the response

    res.send(data);    // Send the user data as a response
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// user login and get jwt auth token send as response
router.post('/login', async (req, res) => {
    // Find the user by email
    const user = await CreateUser.findOne({ username: req.body.username });

    // If the user is not found, return a 404 error
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        });
    }

    // Compare the provided password with the stored hashed password
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        });
    }

    // Generate a JWT token with the user's ID
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    // Send the token in the response
    res.send({
        message: 'success',
        token: token
    });
});



// Route to get authenticated user details 
router.get('/user', async (req, res) => {
    try {
        // Retrieve the JWT token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

        if (!token) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // Verify the JWT token and extract the claims (user ID)
        const claims = jwt.verify(token, JWT_SECRET);

        // If the token is invalid, return a 401 error
        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // Find the user by ID (extracted from the token claims)
        const user = await CreateUser.findOne({ _id: claims._id });
        if (!user) {
            return res.status(404).send({
                message: 'user not found'
            });
        }

        // Exclude the password field from the response
        const { password, ...data } = await user.toJSON();

        // Send the user data as a response
        res.send(data);
    } catch (e) {
        console.error('Error:', e);
        // If any error occurs (e.g., invalid token), return a 401 error
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
});
// search user profile and return profile data 
router.get('/find/:username', async (req, res) => {

    try {
        const user = await CreateUser.findOne({ username: req.params.username });
  
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
  });

router.put('/edit-profile', async (req, res) =>{
    try {
        // Retrieve the JWT token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
        const { updatedName, updatedUsername, updatedBio} = req.body;

        if (!token) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // Verify the JWT token and extract the claims (user ID)
        const claims = jwt.verify(token, JWT_SECRET);

        // If the token is invalid, return a 401 error
        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // Find the user by ID (extracted from the token claims)
        const user = await CreateUser.findOne({ _id: claims._id });
        if (!user) {
            return res.status(404).send({
                message: 'user not found'
            });
        }

        // update values 
        user.name = updatedName;
        user.username = updatedUsername;
        user.bio = updatedBio;
        user.save();

        // Send the user data as a response without password
        // const { password, ...data } = await user.toJSON();
    } catch (e) {
        console.error('Error:', e);
        // If any error occurs (e.g., invalid token), return a 401 error
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
});



    //     data.email = updatedEmail;
    //     data.save();
    
        
    //     res.status(200).json({msg: "saved"})
    //   }catch (err){
    //   console.log (err);
    //   res.status (500).json({error: 'Internal Server Error'});
    //   }
    // })

module.exports = router;
