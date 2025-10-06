const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM announcements');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get announcements by club
router.get('/club/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    const result = await db.query('SELECT * FROM announcements WHERE club_id = $1', [clubId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create announcement
router.post('/', authenticateToken, async (req, res) => {
  const { club_id, title, content } = req.body;
  const user_id = req.user.id;
  try {
    // Check if user is a club head or member
    const clubHead = await db.query('SELECT * FROM club_users WHERE student_id = $1 AND club_id = $2', [user_id, club_id]);
    if (clubHead.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized to create announcements for this club' });
    }
    const result = await db.query(
      'INSERT INTO announcements (club_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [club_id, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await db.query(
      'UPDATE announcements SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM announcements WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
