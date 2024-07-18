document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const queryInputs = document.querySelectorAll('input[name="query"]');
    const messageTextarea = document.getElementById('message');
    const consentCheckbox = document.getElementById('consent');
    const requiredTexts = document.querySelectorAll('.required-text');
    const successMessage = document.getElementById('success-message');

    // Hide success message initially
    successMessage.style.display = 'none';

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting

        let isValid = true;

        // Function to display required text and add error class
        const displayRequiredText = (element, message) => {
            const requiredText = element.nextElementSibling;
            requiredText.textContent = message;
            requiredText.style.display = 'block';
            element.classList.add('error');
            isValid = false;
        };

        // Hide all required texts and remove error class
        requiredTexts.forEach(text => {
            text.style.display = 'none';
        });

        [firstNameInput, lastNameInput, emailInput, messageTextarea].forEach(input => {
            input.classList.remove('error');
        });

        // Validate first name
        if (firstNameInput.value.trim() === '') {
            displayRequiredText(firstNameInput, 'This field is required');
        }

        // Validate last name
        if (lastNameInput.value.trim() === '') {
            displayRequiredText(lastNameInput, 'This field is required');
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            displayRequiredText(emailInput, 'Please enter a valid email address');
        }

        // Validate query type
        let isQueryTypeChecked = false;
        queryInputs.forEach(input => {
            if (input.checked) {
                isQueryTypeChecked = true;
            }
        });
        if (!isQueryTypeChecked) {
            const queryError = document.querySelector('.query-container .required-text');
            queryError.textContent = 'Please select a query type';
            queryError.style.display = 'block';
            queryInputs.forEach(input => input.classList.add('error'));
            isValid = false;
        } else {
            queryInputs.forEach(input => input.classList.remove('error'));
        }

        // Validate message
        if (messageTextarea.value.trim() === '') {
            displayRequiredText(messageTextarea, 'This field is required');
        }

        // Validate consent
        if (!consentCheckbox.checked) {
            const consentError = consentCheckbox.parentElement.nextElementSibling;
            consentError.textContent = 'To submit this form, please consent to being contacted';
            consentError.style.display = 'block';
            consentCheckbox.classList.add('error');
            isValid = false;
        } else {
            consentCheckbox.classList.remove('error');
        }

        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();
        }
    });
});
