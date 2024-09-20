const express = require('express');
const cors = require('cors'); 
const crypto = require('crypto');
const fs = require('fs');
// const jwt = require('./utils/jwtGenerator');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todoitem'); 

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

function generateJwtSecret() {
    return crypto.randomBytes(64).toString('hex');
}

// Auto-generate JWT_SECRET if not set
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = generateJwtSecret();
    // Update .env file
    fs.appendFileSync('.env', `\nJWT_SECRET=${process.env.JWT_SECRET}`);
    console.log('New JWT_SECRET generated and added to .env file');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));