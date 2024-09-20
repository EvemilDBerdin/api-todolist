const jwt = require('jsonwebtoken');
const { User } = require('../models');
// const { secret, expiresIn } = require('../config/jwt'); 
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRE;

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ user: { id: user.id } }, secret, { expiresIn });
    await user.update({ user: { token: token } });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Username doesnt exist!' });
    
    else if (!(await user.isValidPassword(password))) return res.status(401).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ user: { id: user.id } }, secret, { expiresIn }); 

    res.json({
      message: 'Successfully Login',
      token: token,
    });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};