require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Security Middleware
app.use(helmet()); // Adds security headers
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restrict to your frontend
    credentials: true // Allow cookies/headers if needed later
}));

// Body Parsing Middleware
app.use(express.json());

// Basic Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Resume Coach API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});