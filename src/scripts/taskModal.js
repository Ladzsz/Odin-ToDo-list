export function initializeTaskModal(triggerSelector, modalSelector, closeSelector, formSelector) {
    const modal = document.querySelector(modalSelector);
    const trigger = document.querySelector(triggerSelector);
    const close = document.querySelector(closeSelector);
    const form = document.querySelector(formSelector);

    // Open the modal
    trigger.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close the modal
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal if clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Close the modal after subm1ission
        modal.style.display = 'none';

        // Clear the form fields
        form.reset();
    });
}