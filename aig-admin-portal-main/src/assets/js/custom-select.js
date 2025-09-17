setTimeout(() => {
    document.querySelectorAll('.custom-select').forEach(selectBox => {
        const display = selectBox.querySelector('.select-display');
        const options = selectBox.querySelectorAll('.dropdown-options-list');

        // Show/hide dropdown
        display.addEventListener('click', (e) => {
            e.stopPropagation();
            selectBox.classList.toggle('active');
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                display.querySelector('span').textContent = option.textContent;
                selectBox.classList.remove('active');
            });
        });

        // Close dropdown on clicking outside
        document.addEventListener('click', (event) => {
            if (!selectBox.contains(event.target)) {
                selectBox.classList.remove('active');
            }
        });
    });
}, 0);