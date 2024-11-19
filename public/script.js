// API URL
const API_BASE_URL = "http://localhost:3000/tasks";

// DOM Elements
const createTaskForm = document.getElementById("create-task-form");
const taskList = document.getElementById("task-list");
const viewTaskBtn = document.getElementById("view-tasks");

// Function to fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_BASE_URL);
        const tasks = await response.json();

        //Clear task list and populate it
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = `Title: ${task.title}, Description: ${task.description}, Status: ${task.status}`;
            taskList.appendChild(taskItem);
        });

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Function to add task
async function createTask(event) {
    event.preventDefault();  // Prevent default form submission
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    
    try{
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title,description,status}),
        });

        if (response.ok) {
            alert("Task created successfully!");
            fetchTasks();
        } else {
            const errorMessage = await response.text();
            console.error("Error creating task", errorMessage);
        }

    } catch(error) {
        console.error("Error creating task:", error)
    }
}

// Event Listeners
createTaskForm.addEventListener("submit", createTask);
viewTaskBtn.addEventListener("click", fetchTasks);

// Default call on page load
fetchTasks();