function createDocumentActivityTable(data) {
    const table = document.createElement('table');
    table.className = 'w-full text-left table-auto';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'text-white/70 text-sm';

    const headers = [
        { text: 'Proponent', iconClass: 'bg-[#5B5BFF] rounded px-2 py-1 text-xs mr-2 align-middle' },
        { text: 'Date', iconClass: 'bx bx-calendar mr-1' },
        { text: 'Status', iconClass: 'bx bx-check-circle mr-1' },
        { text: 'Document', iconClass: 'bx bx-file mr-1' }
    ];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.className = 'font-medium pb-2 pr-2 md:pr-4 whitespace-nowrap';
        if (header.iconClass.includes('bg-')) {
            th.innerHTML = `<span class="${header.iconClass}"></span>${header.text}`;
        } else {
            th.innerHTML = `<i class='${header.iconClass}'></i>${header.text}`;
        }
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-white/10';

    data.forEach(activity => {
        const tr = document.createElement('tr');

        const proponentTd = document.createElement('td');
        proponentTd.className = 'py-3 flex items-center gap-3 pr-2 md:pr-4 whitespace-nowrap';
        const iconDiv = document.createElement('div');
        iconDiv.className = 'w-9 h-9 rounded-full bg-white flex-shrink-0';
        const proponentSpan = document.createElement('span');
        proponentSpan.className = 'text-white';
        proponentSpan.textContent = activity.proponent;
        proponentTd.appendChild(iconDiv);
        proponentTd.appendChild(proponentSpan);
        tr.appendChild(proponentTd);

        const dateTd = document.createElement('td');
        dateTd.className = 'py-3 text-white/80 pr-2 md:pr-4 whitespace-nowrap';
        dateTd.textContent = activity.date;
        tr.appendChild(dateTd);

        const statusTd = document.createElement('td');
        statusTd.className = 'py-3 pr-2 md:pr-4 whitespace-nowrap';
        const statusSpan = document.createElement('span');
        statusSpan.className = 'px-3 py-1 rounded text-xs font-semibold';
        if (activity.status === 'Pending') {
            statusSpan.classList.add('bg-[#2B3F2B]', 'text-green-400');
        } else if (activity.status === 'Revision') {
            statusSpan.classList.add('bg-[#3F2B2B]', 'text-yellow-400');
        }
        statusSpan.textContent = activity.status;
        statusTd.appendChild(statusSpan);
        tr.appendChild(statusTd);

        const documentTd = document.createElement('td');
        documentTd.className = 'py-3 text-white/80 pr-2 md:pr-4 whitespace-nowrap';
        documentTd.textContent = activity.document;
        tr.appendChild(documentTd);

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return table;
}

async function fetchAndDisplayDocumentActivities() {
    const tableContainer = document.getElementById('document-activity-table-container');

    if (!tableContainer) {
        console.error('Error: Element with ID "document-activity-table-container" not found.');
        return;
    }

    try {
        const response = await fetch('/mock_data/document_activities.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const activityData = await response.json();

        if (activityData && activityData.length > 0) {
            tableContainer.innerHTML = '';
            const responsiveWrapper = document.createElement('div');
            responsiveWrapper.className = 'overflow-x-auto';
            const table = createDocumentActivityTable(activityData);
            responsiveWrapper.appendChild(table);
            tableContainer.appendChild(responsiveWrapper);
        } else {
            console.warn('No document activity data available to display.');
            tableContainer.innerHTML = '<p class="text-gray-400 text-center py-4">No document activities to display.</p>';
        }
    } catch (error) {
        console.error("Error fetching or parsing document activity data:", error);
        if (tableContainer) {
            tableContainer.innerHTML = '<p class="text-red-500 text-center py-4">Failed to load document activities. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayDocumentActivities();
});
