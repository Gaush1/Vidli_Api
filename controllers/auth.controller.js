const { User } = require('../models/user');

const login = async (req, res) => {
  const {email, password} = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email or Password is incorrect. ");

  const validatePassword = await user.validatePassword(password);
  if (!validatePassword)
    return res.status(400).send("Email or Password is incorrect. ");

  const token = user.generateAuthToken(); 

  res.send(token);
};

module.exports = login;