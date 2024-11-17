const task = require('../models/taskModel');

const createTask = async(req, res, next) => {
    try {
        const {title, description, status} = req.body;
        const taskId = await task.insertTask(title, description, status);
        res.status(201).json({message: 'Task has been created' ,TaskID: taskId});
    } catch(err) {
        next(err);
    }
};

const viewTasks = async(req, res, next) => {
    try {
        const tasks = await task.getAllTasks();
        res.status(201).json(tasks);
    } catch(err) {
        next(err);
    }
};

const viewTaskById = async(req, res, next) => {
    try {
        const {id} = req.body;
        const tasks = await task.getTaskById(id);
        res.status(201).json(tasks);
    } catch(err) {
        next(err);
    }
};

const removeTask = async(req, res, next) => {
    try {
        const {id} = req.body;
        const tasks = await task.deleteTaskById(id);
        res.status(201).json(tasks);
    } catch(err) {
        next(err);
    }
};

const changeTask = async(req, res, next) => {
    try {
        const {title, description, status, id} = req.body;
        const tasks = await task.updateTaskById(title, description, status, id);
        res.status(201).json(tasks);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    createTask,
    viewTasks,
    viewTaskById,
    removeTask,
    changeTask
};