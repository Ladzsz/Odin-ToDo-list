//exporting the inizlize modal and setting variables
export function initializeModal(triggerSelector, modalSelector, closeSelector, formSelector) {
    const modal = document.querySelector(modalSelector);
    const triggers = document.querySelectorAll(triggerSelector); // Changed variable name to 'triggers'
    const close = document.querySelector(closeSelector);
    const form = document.querySelector(formSelector);

    // Open the modal for all trigger buttons
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
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

        // Close the modal after submission
        modal.style.display = 'none';

        // Clear the form fields
        form.reset();
    });
}
