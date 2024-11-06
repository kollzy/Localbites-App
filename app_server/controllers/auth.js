// controllers/auth.js

const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Registration form rendering
const registerForm = (req, res) => {
    res.render('register');
};

const processRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).render('register', {
              message: 'Email is already registered.'
          });
      }

      // Create a new user instance and save it to the database
      const newUser = new User({
          username,
          email,
          password
      });

      // Log the data to check if everything is correct
      console.log('New User:', newUser);

      // Save the new user
      await newUser.save();

      // Redirect to login page after successful registration
      return res.redirect('/auth/login');
  } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).render('register', {
          message: 'There was an error with the registration process.'
      });
  }
};

// Login form rendering
const loginForm = (req, res) => {
    res.render('login');
};

// Process login
const processLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render('login', {
                message: 'Username or password is incorrect.'
            });
        }

        // Compare the entered password with the hashed password in the DB
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).render('login', {
                message: 'Username or password is incorrect.'
            });
        }

        // If passwords match, set up a session (or use passport for session management)
        req.session.user = user;
        return res.redirect('/auth/welcome');
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).render('login', {
            message: 'There was an error with the login process.'
        });
    }
};

// Display the welcome page after login
const welcomePage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('welcome', { user: req.session.user });
};

// Logout the user
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Error during logout.');
        }
        res.redirect('/auth/login');
    });
};

// Export the controller functions
module.exports = {
    registerForm,
    processRegister,
    loginForm,
    processLogin,
    welcomePage,
    logout
};
