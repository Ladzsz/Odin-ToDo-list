// Importing styles
import './styles/page_styles.css';
import './styles/project_area_styles.css';
import './styles/modal_styles.css';

// Importing modal logic
import { initializeModal } from './scripts/modal';

// Importing task modal logic
import { initializeTaskModal } from './scripts/taskModal';

// Initialize button event listener for the add project button
document.querySelector('.add-btn').addEventListener('click', function(event) {
    event.preventDefault();
    // Show the project modal
    document.querySelector('#myModal').style.display = 'flex';
});

// Initialize button event listener for the add task button
document.querySelector('.add-task-btn').addEventListener('click', function(event) {
    event.preventDefault();
    // Show the task modal
    document.querySelector('#taskModal').style.display = 'flex';
});

// Initialize the modals
initializeModal('.add-btn', '#myModal', '#closeModal', '#modalForm'); // For project modal
initializeTaskModal('.add-task-btn', '#taskModal', '#closeModal', '#modalForm') //for task modal