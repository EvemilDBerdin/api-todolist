const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const { User } = require('../models');
const { secret, expiresIn } = require('../config/jwt');

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

    const envPath = path.resolve(process.cwd(), '.env'); 
    let envContent = await fs.readFile(envPath, { encoding: 'utf-8' });
    // Regex to match the JWT_SECRET line
    const regex = new RegExp(`^JWT_SECRET=.*$`, 'gm');

    // Replace the existing JWT_SECRET line or append if not found
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `JWT_SECRET=${token}`);
    } else {
      envContent += `\nJWT_SECRET=${token}`;
    }

    // Write updated content back to .env file
    await fs.writeFile(envPath, envContent);

    // fs.appendFileSync('.env', `\nJWT_SECRET=${process.env.JWT_SECRET}`);

    res.json({
      message: 'Successfully Login',
      token: token,
    });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};