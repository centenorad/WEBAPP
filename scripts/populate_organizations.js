// Constants
const HOST              =   "http://localhost/rso-management-back/";
const FILE_DIRECTORY    =   "D:/xampp/htdocs/rso-management-back";

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
    iconDiv.innerHTML = li.innerHTML = `
                    <div class="shader hover event-cards">
                        <img class ="main_event"src="${FILE_DIRECTORY}${rso.image}" alt="${rso.title}">
                    </div>
                `;

    const nameHeading = document.createElement('h3');
    nameHeading.className = 'text-xl font-semibold text-[#00d4ff] mb-2';
    nameHeading.textContent = rso.name;

    const descriptionPara = document.createElement('p');
    descriptionPara.className = 'text-sm text-[#b0b0b0] mb-4 flex-grow';
    descriptionPara.textContent = rso.description;

    const learnMoreLink = document.createElement('a');
    learnMoreLink.href = '#';
    learnMoreLink.className = 'learn-more text-[#00d4ff] no-underline font-bold self-start ' +
        'hover:underline transition duration-300 ease-in-out'; // Transition for underline

    learnMoreLink.textContent = 'Learn More';

    cardDiv.dataset.rsoId = rso.rsoid;
    cardDiv.appendChild(iconDiv);
    cardDiv.appendChild(nameHeading);
    cardDiv.appendChild(descriptionPara);
    cardDiv.appendChild(learnMoreLink);

    return cardDiv;
}

const rsoGridContainer = document.getElementById('organizations-grid');

async function fetchAndDisplayRSOs() {
    try {
        const response = await fetch(`${HOST}rso`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rsoData = await response.json();

        if (rsoGridContainer && rsoData.length > 0) {
            rsoData.forEach((rso) => {
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

    // Placeholder RSO data with longer lists to test scrolling
    const rsoData = [
        {
            id: "1",
            name: "Computer Society",
            description: "A community for tech enthusiasts to collaborate on projects and workshops.",
            logo: "assets/computer-society-logo.png",
            icon: "assets/computer-society-icon.png",
            events: [
                { title: "Coding Workshop - June 2025", image: "assets/event1.jpg" },
                { title: "Hackathon - July 2025", image: "assets/event2.jpg" },
                { title: "Tech Talk: AI Trends - August 2025", image: "assets/event3.jpg" },
                { title: "Web Development Bootcamp - September 2025", image: "assets/event4.jpg" },
                { title: "Cybersecurity Seminar - October 2025", image: "assets/event5.jpg" }
            ],
            officers: [
                { name: "Jane Doe - President", image: "assets/officer1.jpg" },
                { name: "John Smith - Vice President", image: "assets/officer2.jpg" },
                { name: "Alice Johnson - Treasurer", image: "assets/officer3.jpg" },
                { name: "Bob Lee - Secretary", image: "assets/officer4.jpg" },
                { name: "Sarah Kim - Events Coordinator", image: "assets/officer5.jpg" }
            ]
        },
        {
            id: "2",
            name: "ISITE",
            description: "A group focused on IT innovations and career development.",
            logo: "assets/isite-logo.png",
            icon: "assets/isite-icon.png",
            events: [
                { title: "IT Career Fair - June 2025", image: "assets/event1.jpg" },
                { title: "Seminar - July 2025", image: "assets/event2.jpg" },
                { title: "Networking Event - August 2025", image: "assets/event3.jpg" },
                { title: "Cloud Computing Workshop - September 2025", image: "assets/event4.jpg" }
            ],
            officers: [
                { name: "Bob Lee - President", image: "assets/officer1.jpg" },
                { name: "Sarah Kim - Secretary", image: "assets/officer2.jpg" },
                { name: "Mike Brown - Events Coordinator", image: "assets/officer3.jpg" },
                { name: "Emily Davis - Treasurer", image: "assets/officer4.jpg" }
            ]
        },
        {
            id: "3",
            name: "PICE",
            description: "A student chapter dedicated to engineering projects and community service.",
            logo: "assets/pice-logo.png",
            icon: "assets/pice-icon.png",
            events: [
                { title: "Bridge Building Contest - June 2025", image: "assets/event1.jpg" },
                { title: "Community Service - July 2025", image: "assets/event2.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Engineering Symposium - August 2025", image: "assets/event3.jpg" },
                { title: "Site Visit - September 2025", image: "assets/event4.jpg" }
            ],
            officers: [
                { name: "Mike Brown - President", image: "assets/officer1.jpg" },
                { name: "Alice Johnson - Treasurer", image: "assets/officer2.jpg" },
                { name: "Tom Wilson - Vice President", image: "assets/officer3.jpg" },
                { name: "Sarah Kim - Secretary", image: "assets/officer4.jpg" }
            ]
        }
    ];



    // Get modal elements
    const modal = document.getElementById("rso-modal");
    const modalLogo = modal.querySelector(".rso-logo");
    const modalIcon = modal.querySelector(".rso-name .rso-icon img");
    const modalTitle = modal.querySelector(".rso-title");
    const modalDescription = modal.querySelector(".rso-description h3");
    const modalEventsList = modal.querySelector(".rso-events .item-lists");
    const modalOfficersList = modal.querySelector(".rso-officers .item-lists");
    const closeModal = modal.querySelector(".close-modal");

    // Get all RSO cards
    const rsoCards = document.querySelectorAll(".rso-card");

    // Add click event to each RSO card
    rsoCards.forEach(card => {
        card.addEventListener("click", () => {
            const rsoId = card.getAttribute("data-rso-id");
            const rso = rsoData.find(item => item.id == rsoId);

            if (rso) {
                // Populate modal with placeholder data
                modalLogo.src = rso.logo;
                modalIcon.src = rso.icon;
                modalTitle.textContent = rso.name;
                modalDescription.textContent = rso.description;

                // Populate events
                modalEventsList.innerHTML = "";
                rso.events.forEach(event => {
                    const li = document.createElement("li");
                    // li.innerHTML = `
                    //     <div class="rso-icon">
                    //         <img src="${event.image}" alt="${event.title}">
                    //     </div>
                    //     <span>${event.title}</span>
                    // `;
                    // modalEventsList.appendChild(li);
                    li.innerHTML = `
                    <div class="shader hover event-cards">
                        <img class ="main_event"src="${event.image}" alt="${event.title}">
                    </div>
                    <span>${event.title}</span>
                `;
                    modalEventsList.appendChild(li);
                });

                // Populate officers
                modalOfficersList.innerHTML = "";
                rso.officers.forEach(officer => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <div class="rso-icon hover">
                        <img src="${officer.image}" alt="${officer.name}">
                    </div>
                    <span>${officer.name}</span>
                `;
                    modalOfficersList.appendChild(li);
                });

                // Show the modal
                modal.style.display = "flex";
            }
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Horizontal scrolling with mouse wheel for carousel containers
    document.querySelectorAll(".carousel-container").forEach(container => {
        const itemList = container.querySelector(".item-lists");

        container.addEventListener("wheel", (e) => {
            e.preventDefault(); // Prevent vertical scrolling of the modal

            const scrollAmount = e.deltaY > 0 ? 100 : -100; // Scroll by 100px per wheel event
            itemList.scrollLeft += scrollAmount; // Use native scrollLeft for horizontal scrolling
        });

        // Optional: Add touch support for mobile devices (already handled by overflow-x: auto)
        // However, we can enhance the touch experience if needed
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
        });

        container.addEventListener("touchmove", (e) => {
            touchEndX = e.touches[0].clientX;
            const deltaX = touchStartX - touchEndX;
            itemList.scrollLeft += deltaX; // Adjust scroll position
            touchStartX = touchEndX; // Update start position for smooth dragging
        });
    });

    // Features popup logic (click to open, click outside to close)
    const featuresTrigger = document.getElementById('features-trigger');
    const featuresPopup = document.getElementById('features-popup');
    if (featuresTrigger && featuresPopup) {
        featuresTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = featuresPopup.style.display === 'block';
            if (!isOpen) {
                // Temporarily show the popup off-screen to measure its width
                featuresPopup.style.visibility = 'hidden';
                featuresPopup.style.display = 'block';
                featuresPopup.style.left = '-9999px';
                featuresPopup.style.top = '0px';
                // Now measure
                const rect = featuresTrigger.getBoundingClientRect();
                const popupWidth = featuresPopup.offsetWidth;
                let left = rect.left + rect.width / 2 - popupWidth / 2;
                let top = rect.bottom + window.scrollY;
                // Prevent overflow on the left
                if (left < 16) left = 16;
                // Prevent overflow on the right (leave 32px margin)
                if (left + popupWidth > window.innerWidth - 32) {
                    left = window.innerWidth - popupWidth - 32;
                    if (left < 16) left = 16;
                }
                featuresPopup.style.left = left + 'px';
                featuresPopup.style.top = top + 'px';
                featuresPopup.style.visibility = 'visible';
            } else {
                featuresPopup.style.display = 'none';
            }
        });
        document.addEventListener('mousedown', (e) => {
            if (!featuresPopup.contains(e.target) && !featuresTrigger.contains(e.target)) {
                featuresPopup.style.display = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayRSOs);
