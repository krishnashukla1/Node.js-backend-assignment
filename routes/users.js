const express = require('express');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const restrictTo = require('../middleware/roles');
const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateToken, restrictTo('ADMIN'), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, role, is_active FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role (Admin only)
router.patch('/:id/role', authenticateToken, restrictTo('ADMIN'), async (req, res) => {
  const { role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, role',
      [role, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// Toggle user active status (Admin only)
router.patch('/:id/active', authenticateToken, restrictTo('ADMIN'), async (req, res) => {
  const { is_active } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, is_active',
      [is_active, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;