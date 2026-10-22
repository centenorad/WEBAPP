function showContent(id) {
    document.querySelectorAll('.content').forEach(content => {
        content.classList.add('hidden');
    });
    const targetContent = document.getElementById(`content-${id}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle
    const toggleSidebar = document.getElementById('toggleSidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // Create Now button
    const createButton = document.getElementById('create-now-button');
    if (createButton) {
        createButton.addEventListener('click', () => {
            console.log('Create Now button clicked');
            const modal = document.getElementById('proposal-modal');
            if (modal) {
                modal.classList.remove('hidden');
            } else {
                console.error('Modal element #proposal-modal not found.');
            }
        });
    } else {
        console.error('Create Now button #create-now-button not found.');
    }

    // RSO data
    const rsoData = [
        { name: "Computer Society", description: "Lorem ipsum dolor sit amet consectetur.", link: "#" },
        { name: "iSITE", description: "Lorem ipsum dolor sit amet consectetur.", link: "#" },
        { name: "RICE", description: "Lorem ipsum dolor sit amet consectetur.", link: "#" }
    ];

    const searchBar = document.getElementById('searchBar');
    const rsoGrid = document.getElementById('rsoGrid');

    function renderRSOItems(filter = '') {
        if (rsoGrid) {
            rsoGrid.innerHTML = '';
            const filteredRSOs = filter ? rsoData.filter(rso => rso.name.toLowerCase().includes(filter.toLowerCase())) : rsoData;
            filteredRSOs.forEach(rso => {
                const rsoItem = document.createElement('div');
                rsoItem.className = 'bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300';
                rsoItem.innerHTML = `
                    <h3 class="text-lg font-semibold text-white">${rso.name}</h3>
                    <p class="text-sm text-gray-400 mt-2">${rso.description}</p>
                    <a href="${rso.link}" class="text-cyan-400 text-sm mt-2 inline-block hover:underline">Learn More</a>
                `;
                rsoGrid.appendChild(rsoItem);
            });
        }
    }

    if (rsoGrid) {
        renderRSOItems();
    }

    if (searchBar) {
        searchBar.addEventListener('input', () => {
            renderRSOItems(searchBar.value.toLowerCase());
        });
    }

    // Toggle Switch
    window.logToggleState = function(isChecked) {
        console.log(`Toggle switched to: ${isChecked ? "Open" : "Close"}`);
    };

    // Proposal form
    const proposalModal = document.getElementById('proposal-modal');
    const proposalForm = document.getElementById('proposal-form');
    const cancelProposal = document.getElementById('cancel-proposal');
    const submitProposal = document.getElementById('submit-proposal');
    const proposalTableBody = document.getElementById('proposal-table-body');
    const pendingActivitiesContainer = document.getElementById('pending_activities_container');
    const dropBox = document.getElementById('drop-box');
    const fileInput = document.getElementById('proposal-file');
    const attachmentList = document.getElementById('attachment-list');
    let selectedFile = null;

    if (dropBox && fileInput && attachmentList) {
        dropBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropBox.classList.add('outline-blue-600', 'outline-2');
        });

        dropBox.addEventListener('dragleave', () => {
            dropBox.classList.remove('outline-blue-600', 'outline-2');
        });

        dropBox.addEventListener('drop', (e) => {
            e.preventDefault();
            dropBox.classList.remove('outline-blue-600', 'outline-2');
            const files = e.dataTransfer.files;
            if (files.length > 0 && (files[0].name.endsWith('.doc') || files[0].name.endsWith('.docx'))) {
                fileInput.files = files;
                selectedFile = files[0];
                attachmentList.textContent = selectedFile.name;
            } else {
                alert('Please upload a .doc or .docx file for the proposal.');
                attachmentList.textContent = 'No file uploaded';
            }
        });

        dropBox.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (files.length > 0 && (files[0].name.endsWith('.doc') || files[0].name.endsWith('.docx'))) {
                selectedFile = files[0];
                attachmentList.textContent = selectedFile.name;
            } else {
                alert('Please upload a .doc or .docx file for the proposal.');
                attachmentList.textContent = 'No file uploaded';
            }
        });
    }

    if (cancelProposal) {
        cancelProposal.addEventListener('click', () => {
            if (proposalModal) {
                proposalModal.classList.add('hidden');
            }
            if (proposalForm) {
                proposalForm.reset();
            }
            if (attachmentList) {
                attachmentList.textContent = 'No file uploaded';
                attachmentList.classList.remove('text-indigo-300');
            }
            selectedFile = null;
            if (fileInput) {
                fileInput.value = '';
            }
        });
    }

    if (proposalForm && submitProposal && proposalTableBody && pendingActivitiesContainer) {
        proposalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('proponent-name').value;
            const email = document.getElementById('proponent-email').value;
            const role = document.getElementById('proponent-role').value;
            const title = document.getElementById('proposal-title').value;
            const description = document.getElementById('proposal-description').value;
            const venue = document.getElementById('proposal-venue').value;
            const date = document.getElementById('proposal-date').value;
            const startTime = document.getElementById('proposal-start-time').value;
            const endTime = document.getElementById('proposal-end-time').value;
            const file = selectedFile;

            if (!name || !email || !role || !title || !description || !venue || !date || !startTime || !endTime || !file) {
                alert('Please fill out all fields and upload a .doc or .docx file.');
                return;
            }

            submitProposal.disabled = true;
            submitProposal.textContent = 'Processing...';

            setTimeout(() => {
                const newRow = document.createElement('tr');
                newRow.className = 'border-b border-gray-700 hover:bg-gray-800';
                newRow.innerHTML = `
                    <td class="p-2 flex items-center space-x-2">
                        <img src="assets/avatar.png" alt="Avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <p class="text-sm">${name}</p>
                            <p class="text-xs text-gray-500">${email}</p>
                        </div>
                    </td>
                    <td class="p-2">
                        <p class="text-sm">${email}</p>
                    </td>
                    <td class="p-2">
                        <a href="#" class="text-sm text-blue-400 hover:underline">${file.name}</a>
                    </td>
                    <td class="p-2">
                        <span class="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full">Pending</span>
                        <button class="ml-2 text-gray-400 hover:text-white">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                            </svg>
                        </button>
                    </td>
                `;
                proposalTableBody.prepend(newRow);

                let pendingCount = parseInt(pendingActivitiesContainer.textContent) || 0;
                pendingActivitiesContainer.textContent = pendingCount + 1;

                alert('Proposal submitted successfully!');
                proposalForm.reset();
                attachmentList.textContent = 'No file uploaded';
                attachmentList.classList.remove('text-indigo-300');
                selectedFile = null;
                fileInput.value = '';
                proposalModal.classList.add('hidden');
                submitProposal.disabled = false;
                submitProposal.textContent = 'Submit';
            }, 2000);
        });
    }

    // Renew Button
    const renewDropBox = document.getElementById('renew-drop-box');
    const renewFileInput = document.getElementById('renew-file-input');
    const renewAttachmentList = document.getElementById('renew-attachment-list');
    const renewButton = document.getElementById('renew-button');
    let renewSelectedFile = null;

    if (renewDropBox && renewFileInput && renewAttachmentList) {
        renewDropBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            renewDropBox.classList.add('outline-blue-600', 'outline-2');
        });

        renewDropBox.addEventListener('dragleave', () => {
            renewDropBox.classList.remove('outline-blue-600', 'outline-2');
        });

        renewDropBox.addEventListener('drop', (e) => {
            e.preventDefault();
            renewDropBox.classList.remove('outline-blue-600', 'outline-2');
            const files = e.dataTransfer.files;
            if (files.length > 0 && (files[0].name.endsWith('.doc') || files[0].name.endsWith('.docx'))) {
                renewFileInput.files = files;
                renewSelectedFile = files[0];
                renewAttachmentList.textContent = renewSelectedFile.name;
            } else {
                alert('Please upload a .doc or .docx file.');
                renewAttachmentList.textContent = 'No file uploaded';
            }
        });

        renewDropBox.addEventListener('click', () => {
            renewFileInput.click();
        });

        renewFileInput.addEventListener('change', () => {
            const files = renewFileInput.files;
            if (files.length > 0 && (files[0].name.endsWith('.doc') || files[0].name.endsWith('.docx'))) {
                renewSelectedFile = files[0];
                renewAttachmentList.textContent = renewSelectedFile.name;
            } else {
                alert('Please upload a .doc or .docx file.');
                renewAttachmentList.textContent = 'No file uploaded';
            }
        });
    }

    if (renewButton) {
        renewButton.addEventListener('click', () => {
            if (!renewSelectedFile) {
                alert('Please upload a .doc or .docx file.');
                return;
            }
            const formData = new FormData();
            formData.append('file', renewSelectedFile);
            renewButton.disabled = true;
            renewButton.querySelector('div').textContent = 'Processing...';
            setTimeout(() => {
                console.log('Renewal submitted:', { file: renewSelectedFile.name });
                alert('License renewal submitted successfully!');
                renewAttachmentList.textContent = 'No file uploaded';
                renewSelectedFile = null;
                renewFileInput.value = '';
                renewButton.disabled = false;
                renewButton.querySelector('div').textContent = 'RENEW';
            }, 2000);
        });
    }
});