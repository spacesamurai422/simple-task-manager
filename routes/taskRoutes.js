const express = require('express');
const tasks = require('../controllers/taskController');

const router = express.Router();

router.get('/', tasks.viewTasks);
router.get('/:id', tasks.viewTaskById);
router.post('/', tasks.createTask);      // Post is for creating new tasks
router.put('/:id', tasks.changeTask);    // Put is for modifying the whole post, patch is for only some fields
router.delete('/:id', tasks.removeTask);

module.exports = router;