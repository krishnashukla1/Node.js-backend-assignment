const express = require('express');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const restrictTo = require('../middleware/roles');
const router = express.Router();

// Trigger ingestion (Editor, Admin)
router.post('/', authenticateToken, restrictTo('EDITOR', 'ADMIN'), async (req, res) => {
  const { document_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ingestion_jobs (document_id, status) VALUES ($1, $2) RETURNING *',
      [document_id, 'PENDING']
    );
    // Simulate Python backend call (e.g., webhook)
    console.log(`Simulating ingestion for document ${document_id}`);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger ingestion' });
  }
});

// List ingestion jobs (Admin)
router.get('/', authenticateToken, restrictTo('ADMIN'), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ingestion_jobs');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ingestion jobs' });
  }
});

module.exports = router;