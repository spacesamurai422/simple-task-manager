const db = require('../config/db.js');

// Insert a new task
const insertTask = async (title, description, status) => {
    try {
        const [result] = await db.query('INSERT INTO tasks (title,description,status) VALUES (?,?,?)', [title, description, status]);
        console.log(result);
        return result.insertId;
    } catch(err) {
        console.error('Error inserting task:', err.message);  // Log error in the nodejs console
        throw new Error ('Database error when inserting task');  // Propograte error to handle at app level
    }
};

// Get all the tasks
const getAllTasks = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks ORDER BY updated_at DESC');   // using [] to break the db.query output and take only the 1st portion (rows of results) and ignore metdata
        return rows;
    } catch(err) {
        console.error('Error getting all the task:', err.message);
        throw new Error ('Database error when retrieving the tasks');
    }
    
};

// Get a specific task
const getTaskById = async (id) => {
    try {
        const [row] = await db.query('SELECT * FROM tasks WHERE id=?', [id]);
        return row;
    } catch(err) {
        console.error('Error getting the specific task:', err.message);
        throw new Error ('Database error when retrieving task');
    }

};

// Update an existing task by id
const updateTaskById = async (title, description, status, id) => {
    try {
        const [result] = await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id=?', [title,description,status,id])
        console.log(result);
        return result.affectedRows > 0;  // true if task is updated or deleted
    } catch(err) {
        console.error('Error updating the task:', err.message);
        throw new Error ('Database error when updating task');
    }

};

// Delete an existing task by id
const deleteTaskById = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id=?', [id]);
        return result.affectedRows > 0;  // true if task is updated or deleted
    } catch(err) {
        console.error('Error deleting the task:', err.message);
        throw new Error ('Database error when deleting task');
    }
};

module.exports = {
    insertTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
};