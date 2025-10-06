require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const clubRoutes = require('./routes/clubs');
const eventRoutes = require('./routes/events');
const announcementRoutes = require('./routes/announcements');
const feedbackRoutes = require('./routes/feedback');

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/clubs', clubRoutes);
app.use('/events', eventRoutes);
app.use('/announcements', announcementRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
