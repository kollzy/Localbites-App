const User = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');



// Register a new user 
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

  
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token, // Send token with response for authentication
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Error registering user, please try again' });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

   
    if (user.password !== password) {
      return res.status(400).send('Invalid email or password');
    }

    // Save user info to session
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    // Redirect to the logout confirmation page
    res.redirect('/auth/logout');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('An error occurred during login');
  }
  exports.logout = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).send('An error occurred during logout');
      }
  
      // Redirect to the home page after logout
      res.redirect('/');
    });
  };
  
};
  