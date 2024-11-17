const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware to parse JSON req body
app.use(express.json());

// Error handling with middleware yet to be added

app.use('/tasks', taskRoutes);
module.exports = app;