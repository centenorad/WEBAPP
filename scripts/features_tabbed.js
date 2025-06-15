document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const featureContents = document.querySelectorAll('.feature-content');

    featureContents.forEach(content => content.classList.add('hidden'));

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove 'active-tab' from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active-tab')
                btn.classList.remove('bg-[#1657E8]/20');
            });

            // 2. Add 'active-tab' to the clicked button
            button.classList.add('active-tab');
            button.classList.add('bg-[#1657E8]/20');

            // 3. Hide all feature content panels
            featureContents.forEach(content => {
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
        if (tabButtons.length > 0 && featureContents.length > 0) {
            tabButtons[0].classList.add("active-tab");
            tabButtons[0].classList.add("bg-[#1657E8]/20");
            featureContents[0].classList.remove("hidden");
        }
    }
});
