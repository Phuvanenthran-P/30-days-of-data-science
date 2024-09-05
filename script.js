document.addEventListener('DOMContentLoaded', function() {

    // Function to load checkbox state from local storage
    function loadCheckboxState() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const isChecked = localStorage.getItem(checkbox.id) === 'true';
            checkbox.checked = isChecked;
            if (isChecked) {
                checkbox.disabled = true; // Disable the checkbox if it's checked
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
            if (checkbox.checked) {
                localStorage.setItem(checkbox.id, 'true'); // Save as checked in local storage
                checkbox.disabled = true; // Disable the checkbox once checked
                checkbox.parentNode.style.textDecoration = 'line-through';
            } else {
                checkbox.parentNode.style.textDecoration = 'none';
            }
        });

        // Update day colors after saving checkbox state
        updateDayColors();
    }

    // Function to unlock days based on first login date
    function unlockDays() {
        let startDate = localStorage.getItem('startDate');
        
        // If start date is not set, set it to the current date
        if (!startDate) {
            const today = new Date();
            startDate = today.toISOString().split('T')[0];
            localStorage.setItem('startDate', startDate);
        }
        
        const currentDate = new Date();
        startDate = new Date(startDate);
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

        // Update day colors
        updateDayColors();
    }

    // Function to update the colors of the days based on their status
    function updateDayColors() {
        const days = document.querySelectorAll('.day');
        const currentDate = new Date();
        const todayIndex = Math.floor((currentDate - new Date(localStorage.getItem('startDate'))) / (1000 * 60 * 60 * 24));

        days.forEach((day, index) => {
            const checkboxes = day.querySelectorAll('input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (index < todayIndex) {
                // Completed days
                day.style.backgroundColor = allChecked ? '#d4edda' : '#f8d7da'; // Green if completed, red if not
            } else if (index === todayIndex) {
                // Ongoing day
                day.style.backgroundColor = '#fff3cd'; // Yellow
            } else {
                // Future days (locked)
                day.style.backgroundColor = '#f9f9fb'; // Keep the default color
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

    // Permanent date setting functionality for each day
    const dateElements = document.querySelectorAll('.date');

    // Check if the startDate is already set in localStorage
    let startDate = localStorage.getItem('startDate');

    if (!startDate) {
        // If the startDate is not set, set it to the current date
        const today = new Date();
        startDate = today.toISOString().split('T')[0];
        localStorage.setItem('startDate', startDate);
    } else {
        startDate = new Date(startDate);  // Convert the startDate to a Date object
    }

    // Assign the correct date for each day
    dateElements.forEach((dateElement, index) => {
        const dayDate = new Date(startDate);
        dayDate.setDate(dayDate.getDate() + index); // Increment the date by the index
        dateElement.textContent = dayDate.toISOString().split('T')[0]; // Set the date in YYYY-MM-DD format
    });

    // Update the colors of the days on page load
    updateDayColors();
});
