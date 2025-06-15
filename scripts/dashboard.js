document.addEventListener('DOMContentLoaded', () => {
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');
    const overlays = document.querySelectorAll('.overlay');

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            overlays.forEach(overlay => {
                overlay.classList.add('hidden');
            });
        });
    });

    const newRsoOverlay = document.getElementById("new-rso-overlay");
    const editButtons = document.querySelectorAll('button[title="Edit"]');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (newRsoOverlay) {
                newRsoOverlay.classList.remove('hidden');
            }
        });
    });
    const proposalOverlay = document.getElementById("proposal-overlay");
    const showButtons = document.querySelectorAll('.proposal-show');
    showButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (proposalOverlay) {
                proposalOverlay.classList.remove('hidden');
            }
        });
    });
});
