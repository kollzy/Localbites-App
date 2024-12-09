const User = require('../../app_api/models/users');

// Render registration form
const registerForm = (req, res) => {
    res.render('register');
};

// Process registration
const processRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('register', {
                message: 'Email is already registered.'
            });
        }

        // Create and save the new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Save user to session
        req.session.user = { id: newUser._id, username: newUser.username };

        // Redirect to the welcome page
        return res.redirect('/auth/welcome');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).render('register', {
            message: 'There was an error with the registration process.'
        });
    }
};

// Render login form
const loginForm = (req, res) => {
    res.render('login');
};

// Process login
const processLogin = async (req, res) => {
    const { username, password } = req.body;

    // Check if fields are empty
    if (!username || !password) {
        return res.status(400).render('login', { message: 'Please provide both username and password' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).render('login', { message: 'Invalid username or password' });
        }

        // Save user to session
        req.session.user = { id: user._id, username: user.username };

        // Redirect to welcome page
        return res.redirect('/auth/welcome');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { message: 'An error occurred during login. Please try again.' });
    }
    console.log('Login request body:', req.body);

};


// Render welcome page
const welcomePage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    const { username } = req.session.user;

    res.render('welcome', {
        title: 'Welcome to LocalBites',
        username
    });
};

// Logout user
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Error during logout.');
        }
        res.redirect('/');
    });
};

module.exports = {
    registerForm,
    processRegister,
    loginForm,
    processLogin,
    welcomePage,
    logout
};
