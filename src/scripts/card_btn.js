// Import necessary functions and modules
import { saveProjectsToLocalStorage } from './localStorage';

//importing card create
import { card_create } from './card_create';

//functions to make button controls

// Edit button function
export function edit_btn(project, index) {
    // Re-display the modal form
    const form = document.querySelector("#myModal");
    form.style.display = "flex";

    // Set the current values in the form fields
    document.getElementById("projectName").value = project.name;
    document.getElementById("projectDescription").value = project.description;

    // Set a custom data attribute or a global variable to hold the index of the editing project
    document.querySelector("#modalForm").dataset.editingIndex = index;
}

// Delete button function
export function delete_btn(projects, index) {
    // Check if the index is valid
    if (index >= 0 && index < projects.length) {
        // Remove the project from the array
        projects.splice(index, 1);

        // Save the updated projects array to local storage
        saveProjectsToLocalStorage(projects);

        // Re-render the project cards
        card_create(projects);
    } else {
        console.error("Invalid index for deletion");
    }
}

//edit button
export function done_btn(project, button, projects) {
    // Assume project has a `done` property to track its completion state
    project.done = !project.done; // Toggle the done state

    // Change button color based on done state
    button.style.backgroundColor = project.done ? 'green' : '#D9C3C2';

    // Optionally, you might want to ask the user if they want to delete the project
    if (project.done) {
        let checkRemove;
        do {
            checkRemove = prompt('Task completed. Do you wish to remove the task? (YES/NO)').trim().toUpperCase();
        } while (checkRemove !== 'YES' && checkRemove !== 'NO');

        // Remove card if user says yes
        if (checkRemove === 'YES') {
            const index = projects.indexOf(project); // Get the index of the project
            delete_btn(projects, index); // Call delete_btn with the current index
        }
    }
}
