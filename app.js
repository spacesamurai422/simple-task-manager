const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Error handling with middleware yet to be added

app.use('/tasks', taskRoutes);
module.exports = app;