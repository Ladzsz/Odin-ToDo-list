// cardCreate.js
import { projectCards, editingProjectIndex } from './project_area.js';
import { saveProjectsToLocalStorage } from './localStorage.js';

export function createProjectCards() {
    const container = document.querySelector('.projectBody');
    container.innerHTML = '';

    projectCards.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        // Project name area
        const projectNameArea = document.createElement('div');
        projectNameArea.className = 'ProjectName-area';
        card.appendChild(projectNameArea);

        const projectName = document.createElement('h3');
        projectName.textContent = `Project: ${project.projectName}`;
        projectNameArea.appendChild(projectName);

        // Description area
        const projectDescArea = document.createElement('div');
        projectDescArea.className = 'projectDesc-area';
        card.appendChild(projectDescArea);

        const projectDesc = document.createElement('h3');
        projectDesc.textContent = `Description: ${project.description}`;
        projectDescArea.appendChild(projectDesc);

        // Button area
        const projectBtnArea = document.createElement('div');
        projectBtnArea.className = 'project-btns-area';
        card.appendChild(projectBtnArea);

        // Buttons for the project
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.className = 'remove-btn';

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.className = 'done-btn';

        projectBtnArea.appendChild(editBtn);
        projectBtnArea.appendChild(removeBtn);
        projectBtnArea.appendChild(doneBtn);

        // Event listener to toggle the done state
        doneBtn.addEventListener('click', function() {
            project.done = !project.done;
            doneBtn.style.backgroundColor = project.done ? 'green' : '#D9C3C2';
        });

        // Event listener to edit the project
        editBtn.addEventListener('click', function() {
            document.querySelector(".input-form").style.display = "block";
            document.getElementById("projectName").value = project.projectName;
            document.getElementById("projectDescription").value = project.description;
            editingProjectIndex = index;
        });

        // Event listener to remove the project
        removeBtn.addEventListener('click', function() {
            projectCards.splice(index, 1);
            createProjectCards();
            saveProjectsToLocalStorage();
        });

        container.appendChild(card);
    });
}
