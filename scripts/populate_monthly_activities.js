function createMonthlyActivityCard(activity) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bg-[#353535] rounded-lg px-4 py-3 md:px-6 md:py-4 ' +
        'flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'w-12 h-12 rounded-full bg-white flex-shrink-0';

    const clubNameSpan = document.createElement('span');
    clubNameSpan.className = 'text-white font-medium text-sm md:text-base whitespace-nowrap';
    clubNameSpan.textContent = activity.club_name;

    const activityTitleSpan = document.createElement('span');
    activityTitleSpan.className = 'text-white/80 text-sm md:text-base truncate max-w-[150px] md:max-w-none';
    activityTitleSpan.textContent = activity.activity_title;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'text-white/80 text-sm md:text-base whitespace-nowrap';
    dateSpan.textContent = activity.date;

    const proponentSpan = document.createElement('span');
    proponentSpan.className = 'text-white/80 text-sm md:text-base whitespace-nowrap';
    proponentSpan.textContent = activity.proponent;

    cardDiv.appendChild(iconDiv);
    cardDiv.appendChild(clubNameSpan);
    cardDiv.appendChild(activityTitleSpan);
    cardDiv.appendChild(dateSpan);
    cardDiv.appendChild(proponentSpan);

    return cardDiv;
}

async function fetchAndDisplayMonthlyActivities() {
    const monthlyActivitiesContainer = document.getElementById('monthly-activities-list');

    if (!monthlyActivitiesContainer) {
        console.error('Error: Element with ID "monthly-activities-list" not found.');
        return;
    }

    try {
        const response = await fetch('/mock_data/monthly_activities.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const activityData = await response.json();

        if (activityData && activityData.length > 0) {
            monthlyActivitiesContainer.innerHTML = '';
            activityData.forEach(activity => {
                const card = createMonthlyActivityCard(activity);
                monthlyActivitiesContainer.appendChild(card);
            });
        } else {
            console.warn('No monthly activity data available to display.');
            monthlyActivitiesContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">No monthly activities to display.</p>';
        }
    } catch (error) {
        console.error("Error fetching or parsing monthly activity data:", error);
        if (monthlyActivitiesContainer) {
            monthlyActivitiesContainer.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load monthly activities. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMonthlyActivities();
});
