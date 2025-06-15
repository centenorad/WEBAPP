document.querySelector('.submit-btn').addEventListener('click', function () {
    // Optionally redirect to a success page or back to landing page
    window.location.href = 'index.html';
});

// Add drag and drop functionality
const uploadArea = document.querySelector('.upload-area');

uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    this.style.borderColor = '#4a89dc';
});

uploadArea.addEventListener('dragleave', function (e) {
    e.preventDefault();
    this.style.borderColor = '#666';
});

uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    this.style.borderColor = '#666';
    const files = e.dataTransfer.files;
    // Here you would typically handle the file upload
    if (files.length > 0) {
        console.log('File dropped:', files[0].name);
    }
});

uploadArea.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.doc,.docx';
    input.click();

    input.onchange = function () {
        if (this.files && this.files[0]) {
            // Here you would typically handle the file upload
            console.log('File selected:', this.files[0].name);
        }
    };
});

// Add download template functionality
document.querySelector('.download-link').addEventListener('click', function () {
    // Here you would typically provide a link to download the template
    alert('Template download will be available soon.');
});

function selectNavRoute(index) {
    if (index < 0 || index >= 3) {
        return;
    }

    const routes = ["register", "confirm", "submit"];
    const containers = routes.map(id => document.getElementById(id));

    for (const container of containers) {
        container.classList.add("hidden");
    }

    containers[index].classList.remove("hidden");

    const buttons = document.getElementById("nav-links").children;
    for (const button of buttons) {
        button.classList.remove("active");
    }

    document.querySelector(`#nav-links > button:nth-child(${index + 1})`).classList.add("active");
}
