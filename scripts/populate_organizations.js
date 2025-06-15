function createRsoCard(rso) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'rso-card ' +
        'bg-[rgba(22,33,62,0.55)] p-6 rounded-[10px] text-left ' +
        'border-t border-b border-[rgba(255,255,255,0.2)] ' +
        'transition-transform duration-300 ease-in-out ' +
        'flex flex-col justify-between min-h-[200px] ' +
        'w-full sm:w-72 lg:w-80 max-w-sm ' +
        'hover:scale-105 hover:border-2 hover:border-[#00d4ff]';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'rso-icon w-10 h-10 bg-white rounded-full flex items-center justify-center ' +
        'text-xl font-bold text-gray-800 mb-4';
    iconDiv.textContent = rso.name.charAt(0).toUpperCase();

    const nameHeading = document.createElement('h3');
    nameHeading.className = 'text-xl font-semibold text-[#00d4ff] mb-2';
    nameHeading.textContent = rso.name;

    const descriptionPara = document.createElement('p');
    descriptionPara.className = 'text-sm text-[#b0b0b0] mb-4 flex-grow';
    descriptionPara.textContent = rso.description;

    const learnMoreLink = document.createElement('a');
    learnMoreLink.href = rso.link;
    learnMoreLink.className = 'learn-more text-[#00d4ff] no-underline font-bold self-start ' +
        'hover:underline transition duration-300 ease-in-out'; // Transition for underline

    learnMoreLink.textContent = 'Learn More';

    cardDiv.appendChild(iconDiv);
    cardDiv.appendChild(nameHeading);
    cardDiv.appendChild(descriptionPara);
    cardDiv.appendChild(learnMoreLink);

    return cardDiv;
}

const rsoGridContainer = document.getElementById('organizations-grid');

async function fetchAndDisplayRSOs() {
    try {
        const response = await fetch('/mock_data/organizations.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rsoData = await response.json();

        if (rsoGridContainer && rsoData.length > 0) {
            rsoData.forEach(rso => {
                const card = createRsoCard(rso);
                rsoGridContainer.appendChild(card);
            });
        } else if (!rsoGridContainer) {
            console.error('Error: Element with ID "rso-grid-container" not found.');
        } else {
            console.warn('No RSO data available to display.');
        }
    } catch (error) {
        console.error("Error fetching or parsing RSO data:", error);
        if (rsoGridContainer) {
            rsoGridContainer.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load organizations. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayRSOs);
