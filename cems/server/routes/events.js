const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const eventResult = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(eventResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for event
router.post('/:id/register', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const student_id = req.user.id;
  try {
    // Check if already registered
    const existing = await db.query('SELECT * FROM registrations WHERE student_id = $1 AND event_id = $2', [student_id, id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    await db.query('INSERT INTO registrations (student_id, event_id) VALUES ($1, $2)', [student_id, id]);
    res.json({ message: 'Registered for event successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
