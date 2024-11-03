

const renderLogin = (req, res) => {
  res.render('login', { title: 'Login to LocalBites' });
};

const handleLogin = (req, res) => {

  console.log(req.body);
  res.redirect('/');
};

const renderRegister = (req, res) => {
  res.render('register', { title: 'Register for LocalBites' });
};

const handleRegister = (req, res) => {
  
  console.log(req.body);
  res.redirect('/');
};

module.exports = {
  renderLogin,
  handleLogin,
  renderRegister,
  handleRegister
};
