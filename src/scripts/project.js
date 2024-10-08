//importing task js
import { Task, renderTaskCards } from './task';

//making the array

export let projects = [];

//making the construcotr

export class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.done = false;
        this.tasks = [];
    }

    // Method to add a task to the project
    addTask(task) {
        this.tasks.push(task);
    }
}

// Function to find a project by name
export function findProjectByName(projectName) {
    return projects.find(project => project.name === projectName);
}

// Variable to track the project being edited
let editingProjectIndex = null;

const formsubmit = document.querySelector('#projectForm button[type="submit"]');


//event listener when suvbmit on form is clicked
formsubmit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    //grabbing form
    let form = document.getElementById('projectModal');

    //making form display none
    form.style.display = "none";

    //grabbing name and description
    let Pname = document.getElementById('projectName').value.trim();

    let Pdesc = document.getElementById('projectDescription').value.trim();

    // Check for existing project names to ensure user doesnt duplicate name
    const existingProject = projects.find(project => project.name === Pname);
    if (existingProject) {

        // Display an error message
        alert('A project with this name already exists.'); 

        //making form display block to ensure form stays visible
        form.style.display = "block";

        // Stop further execution if the project already exists
        return; 
    }

    //if statement to check if in edit mode or not
    if (editingProjectIndex === null) {
        // If not in edit mode, add a new project
        const newProject = new Project(Pname, Pdesc);
        projects.push(newProject);
    } else {
        // If in edit mode, update the existing project
        projects[editingProjectIndex].name = Pname;
        projects[editingProjectIndex].description = Pdesc;

        // Reset the editing index after updating
        editingProjectIndex = null; 
    }

    // Save projects to local storage
    saveProjectsToLocalStorage();

    // Re-render cards
    CreateProjectCards(projects);

    // Clear input fields
    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
});

// Function to save the projects array to localStorage
export function saveProjectsToLocalStorage() { 
    localStorage.setItem('projects', JSON.stringify(projects));
}

//function to load projects
function loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        projects.length = 0; // Clear the existing array
        const parsedProjects = JSON.parse(savedProjects);
        
        // Recreate Project instances and assign tasks
        parsedProjects.forEach((proj) => {
            const project = new Project(proj.name, proj.description);
            // Convert task objects back to Task instances if needed
            proj.tasks.forEach(task => {
                project.addTask(new Task(task.name, task.description, task.dueDate, proj.name));
            });
            projects.push(project);
        });
    }
}

// Load projects on page load
window.addEventListener('load', () => {
    loadProjectsFromLocalStorage(); // Load projects from localStorage
    ProjectList(); //calling the hrlper function to help the cards
                   //display on load.
});

// Function to display the cards when loaded.
function ProjectList() {
    CreateProjectCards(projects);
}

// Function to create project cards
function CreateProjectCards(projects) {
    const container = document.querySelector('.project_container');

    // Clear the container to avoid duplicating cards
    container.innerHTML = '';

    projects.forEach((project, index) => {
        // Creating project cards
        const card = document.createElement('div');
        card.className = 'card';

        // Creating project name area
        const Pname_area = document.createElement('div');
        Pname_area.className = 'Projectname-area';
        card.appendChild(Pname_area);

        // Adding the project name to the project name area
        const Pname = document.createElement('h3');
        Pname.textContent = `Project: ${project.name}`;
        Pname_area.appendChild(Pname);

        // Creating description area
        const pdesc_area = document.createElement('div');
        pdesc_area.className = 'projectdesc-area';
        card.appendChild(pdesc_area);

        // Adding the Description to the description area
        const Pdesc = document.createElement('h3');
        Pdesc.textContent = `Description: ${project.description}`;
        pdesc_area.appendChild(Pdesc);

        // Creating button area on cards
        const Pbtn_area = document.createElement('div');
        Pbtn_area.className = 'project-btns-area';
        card.appendChild(Pbtn_area);

        // Creating buttons for the button area

        //edit
        const edit_btn = document.createElement('button');
        edit_btn.textContent = 'Edit';
        edit_btn.className = 'edit-btn';
        
        //delete
        const remove_btn = document.createElement('button');
        remove_btn.textContent = 'Delete';
        remove_btn.className = 'remove-btn';

        //done
        const done_btn = document.createElement('button');
        done_btn.textContent = 'Done';
        done_btn.className = 'done-btn';

        // Adding buttons to button area
        Pbtn_area.appendChild(edit_btn);
        Pbtn_area.appendChild(remove_btn);
        Pbtn_area.appendChild(done_btn);

        // Creating task container area
        const task_area = document.createElement('div');
        task_area.className = 'task-container';
        task_area.setAttribute('data-project-name', project.name);
        card.appendChild(task_area);

        // Event listener for showing tasks
        card.addEventListener('click', function () {
            // Close other task lists
            const allTaskContainers = document.querySelectorAll('.task-container');
            allTaskContainers.forEach(container => {
                if (container !== task_area) {
                    container.style.display = 'none'; // Hide other task lists
                }
            });

            // Toggle the visibility of the task area
            task_area.style.display = task_area.style.display === 'flex' ? 'none' : 'flex';
            renderTaskCards(project, task_area); // Populate tasks
        });

        // Event listener to edit the card's content
        edit_btn.addEventListener('click', function() {
            // Populate the modal fields with the current project details
            document.getElementById("projectName").value = project.name;
            document.getElementById("projectDescription").value = project.description;

            editingProjectIndex = index; // Set the index for editing

            // Open the modal
            document.querySelector("#projectModal").style.display = 'flex';
        });

        // Setting the initial color of the done button
        done_btn.classList.toggle('done', project.done);

        // Event listener to toggle the done state
        done_btn.addEventListener('click', function() {
            project.done = !project.done;
            done_btn.classList.toggle('done', project.done);
        });

        // Event listener to remove the card
        remove_btn.addEventListener('click', function() {
            projects.splice(index, 1); 
            CreateProjectCards(projects); 

            // Save updated projects to localStorage
            saveProjectsToLocalStorage();
        });

        // Adding the card to the card container
        container.appendChild(card);
    });
}