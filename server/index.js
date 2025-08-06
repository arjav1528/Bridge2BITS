const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connectDB } = require('./src/db/db');
require('dotenv').config();
const authRoutes = require('./src/routes/auth');

require('./src/config/passport');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.JWT_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB().then(() => {

  app.use('/auth', authRoutes);
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Server is running!',
      user: req.user || null
    });
  });

  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});