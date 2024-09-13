// modal.js

export function initializeModal(triggerSelector, modalSelector, closeSelector, formSelector) {
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

        // Optionally handle form data here
        console.log('Form submitted');

        // Close the modal after submission
        modal.style.display = 'none';
    });
}
