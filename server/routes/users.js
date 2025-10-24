const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded users
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    // Password is "password123"
    passwordHash: '$2b$10$AqtCHDDU9zLGX4zIDPhMruPjqJXVdYugIEI4YY4/tfk0ORVOV/DZK',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Client User',
    email: 'client@example.com',
    // Password is "password123"
    passwordHash: '$2b$10$AqtCHDDU9zLGX4zIDPhMruPjqJXVdYugIEI4YY4/tfk0ORVOV/DZK',
    role: 'client',
  },
  {
    id: '3',
    name: 'Assessor User',
    email: 'assessor@example.com',
    // Password is "password123"
    passwordHash: '$2b$10$AqtCHDDU9zLGX4zIDPhMruPjqJXVdYugIEI4YY4/tfk0ORVOV/DZK',
    role: 'assessor',
  },
];

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).send('Server error: JWT_SECRET not configured');
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/register
// @desc    Register a new user (disabled)
// @access  Public
router.post('/register', (req, res) => {
  res.status(403).json({ msg: 'Registration is currently disabled' });
});

module.exports = router;
