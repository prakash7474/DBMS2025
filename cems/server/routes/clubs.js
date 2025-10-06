const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clubs');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get club details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const clubResult = await db.query('SELECT * FROM clubs WHERE id = $1', [id]);
    if (clubResult.rows.length === 0) {
      return res.status(404).json({ message: 'Club not found' });
    }
    const eventsResult = await db.query('SELECT * FROM events WHERE club_id = $1', [id]);
    const announcementsResult = await db.query('SELECT * FROM announcements WHERE club_id = $1', [id]);
    res.json({
      club: clubResult.rows[0],
      events: eventsResult.rows,
      announcements: announcementsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join club
router.post('/:id/join', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const student_id = req.user.id;
  try {
    // Check if already member
    const existing = await db.query('SELECT * FROM memberships WHERE student_id = $1 AND club_id = $2', [student_id, id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Already a member of this club' });
    }
    await db.query('INSERT INTO memberships (student_id, club_id) VALUES ($1, $2)', [student_id, id]);
    res.json({ message: 'Joined club successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
