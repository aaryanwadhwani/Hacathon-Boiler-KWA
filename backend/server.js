require('dotenv').config({ path: './.env' }); // ✅ Explicitly load .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer'); // Import Auth0 middleware

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4999;
const MONGODB_URI = process.env.MONGODB_URI;

// 🚨 Check if MONGODB_URI is defined
if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is undefined! Make sure it's in the .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔐 Configure JWT Validation Middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE, // Your Auth0 API Identifier
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`, // Your Auth0 Domain
  algorithms: ['RS256'],
});

// 🛠 Protected API Route Example
app.get('/api/protected', jwtCheck, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.auth });
});

// ✅ Public Route (No authentication required)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
