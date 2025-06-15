function createActivityProposalCard(proposal) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bg-[#353535] rounded-lg px-4 py-3 md:px-6 md:py-4 ' +
                        'flex flex-col md:flex-row items-start md:items-center justify-between ' +
                        'gap-4 md:gap-0';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'flex items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap min-w-0';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'w-12 h-12 rounded-full bg-white flex-shrink-0';

    const clubNameSpan = document.createElement('span');
    clubNameSpan.className = 'text-white font-medium text-sm md:text-base whitespace-nowrap';
    clubNameSpan.textContent = proposal.club_name;

    const proposalTitleSpan = document.createElement('span');
    proposalTitleSpan.className = 'text-white/80 text-sm md:text-base truncate max-w-[150px] md:max-w-none';
    proposalTitleSpan.textContent = proposal.proposal_title;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'text-white/80 text-sm md:text-base whitespace-nowrap';
    dateSpan.textContent = proposal.date;

    const proponentSpan = document.createElement('span');
    proponentSpan.className = 'text-white/80 text-sm md:text-base whitespace-nowrap';
    proponentSpan.textContent = proposal.proponent;

    const statusSpan = document.createElement('span');
    statusSpan.className = 'ml-0 md:ml-2 px-2 py-0.5 md:px-3 md:py-1 rounded text-xs font-semibold';

    if (proposal.status === 'Pending') {
        statusSpan.classList.add('bg-[#2B3F2B]', 'text-green-400');
    } else if (proposal.status === 'Revision') {
        statusSpan.classList.add('bg-[#3F2B2B]', 'text-yellow-400');
    }
    statusSpan.textContent = proposal.status;

    detailsDiv.appendChild(iconDiv);
    detailsDiv.appendChild(clubNameSpan);
    detailsDiv.appendChild(proposalTitleSpan);
    detailsDiv.appendChild(dateSpan);
    detailsDiv.appendChild(proponentSpan);
    detailsDiv.appendChild(statusSpan);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3 mt-4 md:mt-0 w-full md:w-auto';

    const showDetailsButton = document.createElement('button');
    showDetailsButton.className = 'w-9 h-9 flex items-center justify-center rounded-full bg-[#232323] border border-[#5B5BFF] text-[#5B5BFF] text-xl flex-shrink-0';
    showDetailsButton.title = 'Show Details';
    showDetailsButton.innerHTML = '<i class=\'bx bx-show\'></i>';

    const approveButton = document.createElement('button');
    approveButton.className = 'uppercase font-bold text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2 rounded border border-[#5B5BFF] text-white ' +
                              'bg-gradient-to-r from-[#5B5BFF] to-[#7F53FF] hover:from-[#7F53FF] hover:to-[#5B5BFF] transition ' +
                              'w-full md:w-auto';
    approveButton.textContent = 'Approve';

    const rejectButton = document.createElement('button');
    rejectButton.className = 'uppercase font-bold text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2 rounded border border-white text-white bg-transparent ' +
                              'hover:bg-white hover:text-[#232323] transition ' +
                              'w-full md:w-auto';
    rejectButton.textContent = 'Reject';

    buttonsDiv.appendChild(showDetailsButton);
    buttonsDiv.appendChild(approveButton);
    buttonsDiv.appendChild(rejectButton);

    cardDiv.appendChild(detailsDiv);
    cardDiv.appendChild(buttonsDiv);

    return cardDiv;
}

async function fetchAndDisplayActivityProposals() {
    const proposalGridContainer = document.getElementById('activity-proposal-grid'); // Assuming you have a div with this ID

    if (!proposalGridContainer) {
        console.error('Error: Element with ID "activity-proposal-grid" not found.');
        return;
    }

    try {
        const response = await fetch('/mock_data/activity_proposals.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const proposalData = await response.json();

        if (proposalData && proposalData.length > 0) {
            proposalGridContainer.innerHTML = '';
            proposalData.forEach(proposal => {
                const card = createActivityProposalCard(proposal);
                proposalGridContainer.appendChild(card);
            });
        } else {
            console.warn('No activity proposal data available to display.');
            proposalGridContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">No proposals to display.</p>';
        }
    } catch (error) {
        console.error("Error fetching or parsing activity proposal data:", error);
        if (proposalGridContainer) {
            proposalGridContainer.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load proposals. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayActivityProposals);
