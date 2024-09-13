// Array to hold the tasks
let Taskcards = [];

// Creating constructor
class Task {
    constructor(TaskName, description) {
        this.TaskName = TaskName;
        this.description = description;
        this.done = false;
    }
}

// Variable to track the task being edited
let editingTaskIndex = null; 

// Event listener to make button show form
document.querySelector(".add-btn").addEventListener('click', function() {
    document.querySelector(".input-form").style.display = "block";
    editingTaskIndex = null;
});

// Function to create the todo list
function Todolist() {
    // Load tasks from localStorage when the program starts
    loadTasksFromLocalStorage();
}

// Function to create task cards
function CreateTaskCards(Taskcards) {
    const container = document.querySelector('.projectHead')
    const top_sec = document.querySelector(`.Top_btn_sec`); 

    // Clear the container and top card sec to avoid duplicating cards
    container.innerHTML = '';
    top_sec.innerHTML = '';

    Taskcards.forEach((task, index) => {
        // Creating task cards
        const card = document.createElement('div');
        card.className = 'project_card'; 

        // Creating task name area
        const Tname_area = document.createElement('div');
        Tname_area.className = 'Projectname-area';
        card.appendChild(Tname_area);

        // Adding the task name to the task name area
        const Tname = document.createElement('h3');
        Tname.textContent = `Project: ${task.TaskName}`;
        Tname_area.appendChild(Tname);

        // Creating description area
        const tdesc_area = document.createElement('div');
        tdesc_area.className = 'Projectdesc-area';
        card.appendChild(tdesc_area);

        // Adding the Description to the description area
        const Tdesc = document.createElement('h3');
        Tdesc.textContent = `Description: ${task.description}`;
        tdesc_area.appendChild(Tdesc);

        // Creating button area on cards
        const Tbtn_area = document.createElement('div');
        Tbtn_area.className = 'project-btns-area'; 
        card.appendChild(Tbtn_area);

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

        const show_btn = document.createElement('button');
        show_btn.textContent = `${task.TaskName}`;
        show_btn.className = 'show-btn';

        // Adding buttons to button area
        Tbtn_area.appendChild(edit_btn);
        Tbtn_area.appendChild(remove_btn);
        Tbtn_area.appendChild(done_btn);

        //appending show buttons too earlir section
        top_sec.appendChild(show_btn);

        // Setting the initial color of the done button
        if (task.done) {
            done_btn.style.backgroundColor = 'green';
        } else {
            done_btn.style.backgroundColor = '#D9C3C2';
        }

        // Event listener to toggle the done state
        done_btn.addEventListener('click', function() {
            // Toggle the task.done state
            task.done = !task.done;

            if (task.done) {
                let checkRemove;
                // Repeatedly prompt until "YES" or "NO" is entered
                do {
                    checkRemove = prompt('Task completed. Do you wish to remove the task? (YES/NO)').trim().toUpperCase();
                } while (checkRemove !== 'YES' && checkRemove !== 'NO');
                
                // Removing card if user says yes
                if (checkRemove === 'YES') {
                    remove_card();
                    // Reset button color after removal
                    done_btn.style.backgroundColor = '#D9C3C2';
                } else if (checkRemove === 'NO') {
                    done_btn.style.backgroundColor = 'green';
                }
            } else {
                // If task is not done, reset the button color to the default
                done_btn.style.backgroundColor = '#D9C3C2';
            }
        });

        // Event listener to edit the cards content
        edit_btn.addEventListener('click', function() {
            // Re-display form
            document.querySelector(".input-form").style.display = "block";

            // Making new inputs the new tasks
            document.getElementById("projectName").value = task.TaskName;
            document.getElementById("projectDescription").value = task.description;

            // Set the editing index to the current task's index
            editingTaskIndex = index; 
        });

        // Event listener to remove the card
        remove_btn.addEventListener('click', function() {
            Taskcards.splice(index, 1); 
            CreateTaskCards(Taskcards); 

            // Save updated tasks to localStorage
            saveTasksToLocalStorage();
        });

        // Adding the card to the card container
        container.appendChild(card);

        // Function to remove card if user is done
        function remove_card() {
            // Removing card from array
            Taskcards.splice(index, 1); 
            CreateTaskCards(Taskcards); 

            // Save updated tasks to localStorage
            saveTasksToLocalStorage();
        }

        // Event listener to show/hide the task card
        show_btn.addEventListener('click', function() {
            // Hide all cards
            document.querySelectorAll('.project_card').forEach(card => {
                card.style.display = 'none';
            });

            // Show only the clicked card
            card.style.display = 'block';
        });
    });
}

// Function to save the tasks array to localStorage
function saveTasksToLocalStorage() { 
    localStorage.setItem('tasks', JSON.stringify(Taskcards));
}

// Function to load the tasks array from localStorage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        // Clear the existing array
        Taskcards.length = 0;
        // Load saved tasks into the array
        Taskcards.push(...JSON.parse(savedTasks)); 
        // Calling create task cards function
        CreateTaskCards(Taskcards);
    }
}

// Event listener for the submit button
document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault();

    let TaskName = document.getElementById("projectName").value;
    let description = document.getElementById("projectDescription").value;

    console.log('Task Name:', TaskName); // Log task name
    console.log('Description:', description); // Log task description

    if (TaskName === '' || description === '') {
        console.log('For some reason this fixes it?.');
        return;
    }

    if (editingTaskIndex === null) {
        // If not in edit mode, add a new task
        const NewTask = new Task(TaskName, description);
        Taskcards.push(NewTask);
    } else {
        // If in edit mode, update the existing task
        Taskcards[editingTaskIndex].TaskName = TaskName;
        Taskcards[editingTaskIndex].description = description;

        // Reset the editing index after updating
        editingTaskIndex = null; 
    }

    // Running save tasks function
    saveTasksToLocalStorage();
    // Re-rendering cards
    CreateTaskCards(Taskcards);
    // Setting style to none
    document.querySelector(".input-form").style.display = "none";

    // Making form inputs blank
    document.getElementById("projectName").value = ''; 
    document.getElementById("projectDescription").value = '';
});

// Load tasks on page load
window.addEventListener('load', loadTasksFromLocalStorage);