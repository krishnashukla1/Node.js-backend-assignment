const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { log, error } = require('console');
const router = express.Router();

// Register
// routes/auth.js
// router.post('/register', async (req, res) => {
//     const { email, password, role } = req.body;
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const result = await pool.query(
//         'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
//         [email, hashedPassword, role || 'VIEWER']
//       );
//       res.json({
//         id: result.rows[0].id,
//         email: result.rows[0].email,
//         role: result.rows[0].role,
//         created_at: result.rows[0].created_at
//       });
//       console.log('User registered:', result.rows[0]);
//     } catch (error) {
//       console.error('Registration Error:', error);
//       res.status(500).json({ error: 'Registration failed' });
//     }
//   });
  
  

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     const user = result.rows[0];
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     console.log('User found:', user);
//     console.error('User found:', error);
    
    
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//     res.json({ access_token: token });
//     console.log(result.rows[0]);
    
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
//   console.error('Login Error:', error);
  
// });




// Register Route
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
        [email, hashedPassword, role || 'VIEWER']
      );
  
      res.json({
        id: result.rows[0].id,
        email: result.rows[0].email,
        role: result.rows[0].role,
        created_at: result.rows[0].created_at
      });
  
      console.log('User registered:', result.rows[0]);
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  
  // Login Route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ access_token: token });
      console.log('User logged in:', user);
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
  
module.exports = router;