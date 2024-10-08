// Importing projects and necessary functions from Project.js
import { projects, findProjectByName, saveProjectsToLocalStorage, addTask } from './project';

// Task class
export class Task {
    constructor(name, description, dueDate, projectName) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
        this.projectName = projectName;
    }
}

// Variable to track the task being edited
let editingTaskIndex = null;
let editingTaskProjectName = null;

// Event listener for task form submission
const taskFormSubmit = document.querySelector('#taskForm button[type="submit"]');
taskFormSubmit.addEventListener("click", function(event) {
    event.preventDefault();

    // Grabbing task form elements
    let taskName = document.getElementById('taskName').value.trim();
    let taskDesc = document.getElementById('taskDescription').value.trim();
    let taskDueDate = document.getElementById('taskDueDate').value.trim(); // Ensure the correct ID
    let taskProjectName = document.getElementById('taskProjectName').value.trim(); // Ensure the correct ID

    // Find the relevant project
    const project = findProjectByName(taskProjectName);

    if (!project) {
        alert('Project not found.');
        return;
    }

    // Check if we're editing an existing task or creating a new one
    if (editingTaskIndex === null) {
        // Create a new task and add it to the project
        const newTask = new Task(taskName, taskDesc, taskDueDate, taskProjectName);
        project.addTask(newTask); // Ensure project is an instance of Project
    } else {
        // If editing, update the existing task
        const taskToEdit = project.tasks[editingTaskIndex];
        taskToEdit.name = taskName;
        taskToEdit.description = taskDesc;
        taskToEdit.dueDate = taskDueDate;

        // Reset the editing state
        editingTaskIndex = null;
        editingTaskProjectName = null;
    }

    // Save changes to local storage
    saveProjectsToLocalStorage();

    // Re-render the task cards
    renderTaskCards(project);

     // Check if tasks are rendered correctly
     console.log('Tasks for Project after Adding:', project.tasks);

    // Clear input fields
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = ''; // Ensure the correct ID
    document.getElementById('taskProjectName').value = ''; // Ensure the correct ID

    // Hide the task modal
    document.getElementById('taskModal').style.display = 'none';
});

// Function to render tasks inside a project
// Function to render tasks inside a project
function renderTaskCards(project) {
    const taskContainer = document.querySelector(`.task-container[data-project-name="${project.name}"]`);
    if (!taskContainer) {
        console.error(`No task container found for project: ${project.name}`);
        return; // Return if no task container is found for the project
    }

    taskContainer.innerHTML = ''; // Clear previous tasks

    project.tasks.forEach((task, index) => {
        // Create task card
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';

        // Task name
        const taskName = document.createElement('h4');
        taskName.textContent = `Task: ${task.name}`;
        taskCard.appendChild(taskName);

        // Task description
        const taskDesc = document.createElement('p');
        taskDesc.textContent = `Description: ${task.description}`;
        taskCard.appendChild(taskDesc);

        // Task due date
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskCard.appendChild(taskDueDate);

        // Task button area
        const buttonArea = document.createElement('div');
        buttonArea.className = 'task-btns-area';
        taskCard.appendChild(buttonArea);

        // Edit button
        const editTaskBtn = document.createElement('button');
        editTaskBtn.textContent = 'Edit Task';
        editTaskBtn.className = 'edit-task-btn';
        buttonArea.appendChild(editTaskBtn);

        // Remove button
        const removeTaskBtn = document.createElement('button');
        removeTaskBtn.textContent = 'Remove Task';
        removeTaskBtn.className = 'remove-task-btn';
        buttonArea.appendChild(removeTaskBtn);

        // Done button
        const doneTaskBtn = document.createElement('button');
        doneTaskBtn.textContent = task.done ? 'Undo' : 'Done';
        doneTaskBtn.className = 'done-task-btn';
        doneTaskBtn.classList.toggle('done', task.done);
        buttonArea.appendChild(doneTaskBtn);

        // Add event listeners to buttons
        // Edit Task Button Click Event
        editTaskBtn.addEventListener('click', function () {
            document.getElementById('taskName').value = task.name;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskDueDate').value = task.dueDate; 
            document.getElementById('taskProjectName').value = project.name; 

            editingTaskIndex = index; // Set editing index
            editingTaskProjectName = project.name; // Track project for task editing
            document.getElementById('taskModal').style.display = 'flex'; // Show the modal
        });

        // Remove Task Button Click Event
        removeTaskBtn.addEventListener('click', function () {
            project.tasks.splice(index, 1); // Remove task from project
            renderTaskCards(project); // Re-render tasks
            saveProjectsToLocalStorage(); // Save changes
        });

        // Setting the initial color of the done button
        doneTaskBtn.classList.toggle('done', task.done);

        // Event listener to toggle the done state
        doneTaskBtn.addEventListener('click', function() {
            task.done = !task.done;
            doneTaskBtn.classList.toggle('done', task.done);
        });

        // Append task card to task container
        taskContainer.appendChild(taskCard);
    });
}

// Load tasks and render them on page load
function loadAndRenderTasks() {
    projects.forEach(project => {
        renderTaskCards(project); // Render tasks for each project
    });
}

// Load tasks when the page loads
window.addEventListener('load', loadAndRenderTasks);

// Function to handle showing the task modal
export function showTaskModal() {
    document.getElementById('taskModal').style.display = 'flex';
}