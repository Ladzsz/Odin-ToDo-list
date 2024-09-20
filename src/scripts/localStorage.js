// localStorage.js
export function saveProjectsToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
}

export function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(Taskcards));
}

export function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}
