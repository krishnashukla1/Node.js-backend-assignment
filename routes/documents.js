const express = require('express');
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');
const restrictTo = require('../middleware/roles');
const router = express.Router();

// Create document (Editor, Admin)
router.post('/', authenticateToken, restrictTo('EDITOR', 'ADMIN'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.files?.file;
  if (!file) return res.status(400).json({ error: 'File required' });

  const filePath = `uploads/${Date.now()}-${file.name}`;
  file.mv(filePath, async (err) => {
    if (err) return res.status(500).json({ error: 'File upload failed' });
    try {
      const result = await pool.query(
        'INSERT INTO documents (title, description, file_path, created_by_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, filePath, req.user.id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create document' });
    }
  });
});

// Get all documents (Viewer, Editor, Admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM documents');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Update document (Editor, Admin)
router.patch('/:id', authenticateToken, restrictTo('EDITOR', 'ADMIN'), async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE documents SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, description, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// Delete document (Editor, Admin)
router.delete('/:id', authenticateToken, restrictTo('EDITOR', 'ADMIN'), async (req, res) => {
  try {
    await pool.query('DELETE FROM documents WHERE id = $1', [req.params.id]);
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;