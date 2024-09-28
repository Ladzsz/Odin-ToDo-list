// Array to hold the tasks
let TaskCards = [];

// Creating constructor
class Task {
    constructor(TaskName, description, dateTime, projectID) {
        this.TaskName = TaskName;
        this.description = description;
        this.dateTime = dateTime;
        this.projectID = projectID;  // Associate task with project using projectID
        this.done = false; // Task completion status
    }
}

// Variable to track the task being edited
let editingTaskIndex = null;

// Function to create task list
function TaskList(projectID) {
    // If a specific project ID is passed, filter tasks by that project
    const tasksForProject = TaskCards.filter(task => task.projectID === projectID);
    CreateTaskCards(tasksForProject);
}

// Function to create task cards
function CreateTaskCards(filteredTasks) {
    console.log("Rendering task cards");
    const container = document.querySelector('.task-container');  // Ensure this targets the correct container

    // Clear the container to avoid duplicating cards
    container.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        // Creating task cards
        const card = document.createElement('div');
        card.className = 'card';

        // Creating task name area
        const tname_area = document.createElement('div');
        tname_area.className = 'taskname-area';
        card.appendChild(tname_area);

        // Adding the task name to the task name area
        const tname = document.createElement('h3');
        tname.textContent = `Task: ${task.TaskName}`;
        tname_area.appendChild(tname);

        // Creating description area
        const tdesc_area = document.createElement('div');
        tdesc_area.className = 'taskdesc-area';
        card.appendChild(tdesc_area);

        // Adding the description to the description area
        const tdesc = document.createElement('h3');
        tdesc.textContent = `Description: ${task.description}`;
        tdesc_area.appendChild(tdesc);

        // Format the date and time using toLocaleString
        const formattedDateTime = new Date(task.dateTime).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        // Adding the formatted date and time
        const tdate = document.createElement('h4');
        tdate.textContent = `Due Date: ${formattedDateTime}`;
        tdesc_area.appendChild(tdate);

        // Creating button area on cards
        const tbtn_area = document.createElement('div');
        tbtn_area.className = 'task-btns-area';
        card.appendChild(tbtn_area);

        // Creating buttons for the button area
        const edit_btn = document.createElement('button');
        edit_btn.textContent = 'Edit';
        edit_btn.className = 'edit-btn';

        const remove_btn = document.createElement('button');
        remove_btn.textContent = 'Delete';
        remove_btn.className = 'remove-btn';

        const done_btn = document.createElement('button');
        done_btn.textContent = 'Done';
        done_btn.className = 'done-btn';

        // Adding buttons to button area
        tbtn_area.appendChild(edit_btn);
        tbtn_area.appendChild(remove_btn);
        tbtn_area.appendChild(done_btn);

        // Setting the initial color of the done button
        done_btn.style.backgroundColor = task.done ? 'green' : '#D9C3C2';

        // Event listener to toggle the done state
        done_btn.addEventListener('click', function () {
            task.done = !task.done;
            done_btn.style.backgroundColor = task.done ? 'green' : '#D9C3C2';
            saveTasksToLocalStorage();
        });

        // Event listener to edit the card's content
        edit_btn.addEventListener('click', function () {
            // Populate the modal fields with the current task details
            document.getElementById("taskName").value = task.TaskName;
            document.getElementById("taskDescription").value = task.description;
            document.getElementById("taskDate").value = task.dateTime;
            document.getElementById("projectSelect").value = task.projectID;  // Populate project selection

            editingTaskIndex = index; // Set the index for editing

            // Open the modal
            document.querySelector("#taskModal").style.display = 'flex';
        });

        // Event listener to remove the card
        remove_btn.addEventListener('click', function () {
            TaskCards.splice(index, 1);
            CreateTaskCards(filteredTasks);

            // Save updated tasks to localStorage
            saveTasksToLocalStorage();
        });

        // Adding the card to the card container
        container.appendChild(card);
    });
}

// Function to save the tasks array to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(TaskCards));
}

// Function to load the tasks array from localStorage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        TaskCards.length = 0;
        TaskCards.push(...JSON.parse(savedTasks));  // Load saved tasks into the array
    }
}

// Load tasks on page load
window.addEventListener('load', () => {
    loadTasksFromLocalStorage();
});

// Event listener for the add button
document.querySelector(".add-btn").addEventListener('click', function () {
    document.getElementById("taskName").value = '';
    document.getElementById("taskDescription").value = '';
    document.getElementById("taskDate").value = '';
    document.getElementById("projectSelect").value = '';  // Reset project selection
    editingTaskIndex = null;

    // Open the modal
    document.querySelector("#taskModal").style.display = 'flex';
});

// Event listener for the submit button (tasks)
document.querySelector('.submit-btn-tasks').addEventListener('click', function (e) {
    e.preventDefault();

    // Retrieve values from input fields
    let TaskName = document.getElementById("taskName").value.trim();
    let description = document.getElementById("taskDescription").value.trim();
    let date = document.getElementById("taskDate").value.trim();
    let projectID = document.getElementById("projectSelect").value;  // Capture selected project ID

    if (!TaskName || !description || !date || !projectID) {
        return;
    }

    if (editingTaskIndex === null) {
        const newTask = new Task(TaskName, description, date, projectID);
        TaskCards.push(newTask);
    } else {
        // Update existing task
        TaskCards[editingTaskIndex].TaskName = TaskName;
        TaskCards[editingTaskIndex].description = description;
        TaskCards[editingTaskIndex].dateTime = date;
        TaskCards[editingTaskIndex].projectID = projectID;

        editingTaskIndex = null;
    }

    saveTasksToLocalStorage();
    CreateTaskCards(TaskCards.filter(task => task.projectID === projectID));  // Re-render tasks for the selected project
    document.querySelector("#taskModal").style.display = "none";
});

// Close modal when clicking the close button
document.getElementById('closeModal').addEventListener('click', function() {
    document.querySelector("#taskModal").style.display = "none";
});

// Export necessary functions and variables
export { Task, TaskList, TaskCards, saveTasksToLocalStorage, loadTasksFromLocalStorage };
