//importin style sheet
import './styles/page_styles.css';

//importing project area styles
import './styles/project_area_styles.css';

//importing the modal styles
import './styles/modal_styles.css';

//importing project js
import { CreateProject } from './scripts/project_area';

//importing modal js
import { initializeModal } from './scripts/modal';

// Initialize button event listener
document.querySelector('.add-btn').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Display the form when the button is clicked
    document.querySelector('.input-form').style.display = 'block';
});

//initialize form submission event listener
document.querySelector('.input-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    CreateProject();
});

// Initialize the modal
initializeModal('.add-btn', '#myModal', '#closeModal', '#modalForm');