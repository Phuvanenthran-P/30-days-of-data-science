document.addEventListener('DOMContentLoaded', function() {
    // Function to load checkbox state from local storage
    function loadCheckboxState() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const isChecked = localStorage.getItem(checkbox.id) === 'true';
            checkbox.checked = isChecked;
            if (isChecked) {
                checkbox.parentNode.style.textDecoration = 'line-through';
            } else {
                checkbox.parentNode.style.textDecoration = 'none';
            }
        });
    }

    // Function to save checkbox state to local storage
    function saveCheckboxState() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            if (checkbox.checked) {
                checkbox.parentNode.style.textDecoration = 'line-through';
            } else {
                checkbox.parentNode.style.textDecoration = 'none';
            }
        });
    }

    // Function to unlock days based on current date
    function unlockDays() {
        const currentDate = new Date();
        const startDate = new Date('2024-09-03'); // Start date
        const dayDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        const currentDay = dayDifference + 1; // Add 1 to count today as Day 1
        
        // Show only the days that should be unlocked
        const days = document.querySelectorAll('.day');
        days.forEach((day, index) => {
            if (index < currentDay) {
                day.style.display = 'block';
            } else {
                day.style.display = 'none';
            }
        });
    }

    // Initialize the page
    loadCheckboxState();
    unlockDays();

    // Add event listeners to save the state on change
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxState);
    });

    // Add event listener for day headers to toggle content visibility
    const dayHeaders = document.querySelectorAll('.day-header');
    dayHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dateElements = document.querySelectorAll('.date');

    dateElements.forEach((dateElement, index) => {
        // Create a new date object for the current date
        const today = new Date();
        // Format the date as YYYY-MM-DD
        const formattedDate = today.toISOString().split('T')[0];
        // Set the text content of the date element
        dateElement.textContent = formattedDate;
    });
});

