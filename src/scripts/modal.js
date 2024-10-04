// modal.js

document.addEventListener("DOMContentLoaded", function() {
    const projectButton = document.querySelector(".project-btn");
    const taskButton = document.querySelector(".task-btn");
    const projectModal = document.getElementById("projectModal");
    const taskModal = document.getElementById("taskModal");
    
    const closeProjectModalButton = document.querySelector("#projectModal .close");
    const closeTaskModalButton = document.querySelector("#taskModal .close");

    // Add click event listener to the project button
    projectButton.addEventListener("click", function() {
        projectModal.style.display = "block"; // Show the project modal
    });

    // Add click event listener to the task button
    taskButton.addEventListener("click", function() {
        taskModal.style.display = "block"; // Show the task modal
    });

    // Close modal functionality for the project modal
    closeProjectModalButton.onclick = function() {
        projectModal.style.display = "none"; // Hide the project modal when close button is clicked
    };

    // Close modal functionality for the task modal
    closeTaskModalButton.onclick = function() {
        taskModal.style.display = "none"; // Hide the task modal when close button is clicked
    };

    // Hide modal if user clicks outside of the project modal
    window.onclick = function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = "none"; // Hide the project modal
        }
        if (event.target === taskModal) {
            taskModal.style.display = "none"; // Hide the task modal
        }
    };
});