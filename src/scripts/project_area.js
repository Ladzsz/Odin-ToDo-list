// Array to hold the projects
let ProjectCards = [];

// Creating constructor
class Project {
    constructor(ProjectName, description) {
        this.ProjectName = ProjectName;
        this.description = description;
        this.done = false; // You can change this based on project completion criteria
    }
}

// Variable to track the project being edited
let editingProjectIndex = null;

// Function to create project list
function ProjectList() {
    CreateProjectCards(ProjectCards);
}

// Function to create project cards
function CreateProjectCards(ProjectCards) {
    const container = document.querySelector('.card-container');

    // Clear the container to avoid duplicating cards
    container.innerHTML = '';

    ProjectCards.forEach((project, index) => {
        // Creating project cards
        const card = document.createElement('div');
        card.className = 'card';

        // Creating project name area
        const Pname_area = document.createElement('div');
        Pname_area.className = 'Projectname-area';
        card.appendChild(Pname_area);

        // Adding the project name to the project name area
        const Pname = document.createElement('h3');
        Pname.textContent = `Project: ${project.ProjectName}`;
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
        Pbtn_area.appendChild(edit_btn);
        Pbtn_area.appendChild(remove_btn);
        Pbtn_area.appendChild(done_btn);

        // Setting the initial color of the done button
        done_btn.style.backgroundColor = project.done ? 'green' : '#D9C3C2';

        // Event listener to toggle the done state
        done_btn.addEventListener('click', function() {
            project.done = !project.done;
            done_btn.style.backgroundColor = project.done ? 'green' : '#D9C3C2';
        });

        // Event listener to edit the cards content
        edit_btn.addEventListener('click', function() {
            // Populate the modal fields with the current project details
            document.getElementById("projectName").value = project.ProjectName;
            document.getElementById("projectDescription").value = project.description;

            editingProjectIndex = index; // Set the index for editing

            // Open the modal
            document.querySelector("#myModal").style.display = 'flex';
        });

        // Event listener to remove the card
        remove_btn.addEventListener('click', function() {
            ProjectCards.splice(index, 1); 
            CreateProjectCards(ProjectCards); 

            // Save updated projects to localStorage
            saveProjectsToLocalStorage();
        });

        // Adding the card to the card container
        container.appendChild(card);
    });
}

// Function to save the projects array to localStorage
function saveProjectsToLocalStorage() { 
    localStorage.setItem('projects', JSON.stringify(ProjectCards));
}

// Function to load the projects array from localStorage
function loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        // Clear the existing array
        ProjectCards.length = 0;
        // Load saved projects into the array
        ProjectCards.push(...JSON.parse(savedProjects)); 
    }
}

// Load projects on page load
window.addEventListener('load', () => {
    loadProjectsFromLocalStorage(); // Load projects from localStorage
    ProjectList();                  // Create project cards with the loaded projects
});

// Event listener for the add button
document.querySelector(".add-btn").addEventListener('click', function() {
    // Reset the form and set editingProjectIndex to null for adding a new project
    document.getElementById("projectName").value = '';
    document.getElementById("projectDescription").value = '';
    editingProjectIndex = null; // Reset editing index for new project

    // Open the modal
    document.querySelector("#myModal").style.display = 'flex';
});

// Event listener for the submit button
document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault();

    // Retrieve values from input fields
    let ProjectName = document.getElementById("projectName").value.trim(); 
    let description = document.getElementById("projectDescription").value.trim();

    // Check if inputs are valid
    if (!ProjectName || !description) {
        return; 
    }

    if (editingProjectIndex === null) {
        // If not in edit mode, add a new project
        const newProject = new Project(ProjectName, description);
        ProjectCards.push(newProject);
    } else {
        // If in edit mode, update the existing project
        ProjectCards[editingProjectIndex].ProjectName = ProjectName;
        ProjectCards[editingProjectIndex].description = description;

        // Reset the editing index after updating
        editingProjectIndex = null; 
    }

    // Save projects to local storage
    saveProjectsToLocalStorage();
    // Re-render cards
    CreateProjectCards(ProjectCards);
    // Hide the form
    document.querySelector("#myModal").style.display = "none";
});

// Export necessary functions and variables
export { Project, ProjectList, saveProjectsToLocalStorage, loadProjectsFromLocalStorage };
