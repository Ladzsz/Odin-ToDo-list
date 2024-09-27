// Importing styles
import './styles/page_styles.css';
import './styles/project_area_styles.css';
import './styles/modal_styles.css';

// Importing modal logic
import { initializeModal } from './scripts/modal';

// Importing task modal logic
import { initializeTaskModal } from './scripts/taskModal';

//importing js
import { ProjectList, saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './scripts/project_area';


//Initialize the project list
document.addEventListener('DOMContentLoaded', () => {
    ProjectList();
});

// Initialize the modals
initializeModal('.add-btn', '#myModal', '#closeModal', '#modalForm'); // For project modal
initializeTaskModal('.add-task-btn', '#taskModal', '#closeModal', '#modalForm') //for task modal