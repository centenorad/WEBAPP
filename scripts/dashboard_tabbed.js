document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const dashboardContents = document.querySelectorAll('.dashboard-tabbed');

    dashboardContents.forEach(content => content.classList.add('hidden'));

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove 'active-tab' from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active-tab')
            });

            // 2. Add 'active-tab' to the clicked button
            button.classList.add('active-tab');

            // 3. Hide all feature content panels
            dashboardContents.forEach(content => {
                content.classList.add('hidden');
            });

            // 4. Show the target feature content panel
            const targetId = button.dataset.target; // Get the ID from data-target attribute
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });

    // Optional: Set initial active state if not already done in HTML
    // Find the initially active button and ensure its content is shown
    const initialActiveButton = document.querySelector('.tab-button.active-tab');
    if (initialActiveButton) {
        const initialTargetId = initialActiveButton.dataset.target;
        const initialTargetContent = document.getElementById(initialTargetId);
        if (initialTargetContent) {
            initialTargetContent.classList.remove('hidden');
        }
    } else {
        // If no active-tab class is set in HTML, activate the first one
        if (tabButtons.length > 0 && dashboardContents.length > 0) {
            tabButtons[0].classList.add("active-tab");
            dashboardContents[0].classList.remove("hidden");
        }
    }
});
