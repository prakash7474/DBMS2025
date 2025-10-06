const express = require('express');
const router = express.Router();
const db = require('../db');

// Submit feedback
router.post('/', async (req, res) => {
  const { event_id, student_id, rating, comment } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO feedback (event_id, student_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_id, student_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feedback for event
router.get('/event/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await db.query('SELECT * FROM feedback WHERE event_id = $1', [eventId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
