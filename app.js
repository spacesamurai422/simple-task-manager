const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware to parse JSON req body
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'An unexpected error occurred' });
});

app.use('/tasks', taskRoutes);
module.exports = app;