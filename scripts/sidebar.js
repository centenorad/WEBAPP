document.getElementById('toggle_sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    const contents = document.querySelectorAll('.sidebar-content');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.style.width = '56px';
        contents.forEach(el => {
            el.style.opacity = '0';
            el.style.display = 'none';
        });
    } else {
        sidebar.style.width = '256px';
        contents.forEach(el => {
            el.style.display = 'flex'; // Explicitly set to flex for both sections
            setTimeout(() => el.style.opacity = '1', 50); // Slight delay for smooth fade
        });
    }
});
