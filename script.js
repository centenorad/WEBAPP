// Constants
const HOST              =   "http://localhost/rso-management-back/";
const FILE_DIRECTORY    =   "D:/xampp/htdocs/rso-management-back";

// toggle menu
const menuToggle    =   document.querySelector('.menu-toggle');
const nav           =   document.querySelector('.left-header nav');


menuToggle.addEventListener('click',        () =>   { nav.classList.toggle('active'); }); // Toggle menu on click (for mobile)
menuToggle.addEventListener('mouseenter',   () =>   { nav.classList.add('active');    }); // Show menu on hover (for desktop)
nav.addEventListener('mouseleave',          () =>   { nav.classList.remove('active'); }); // Hide menu on hover (for desktop)

window.addEventListener('scroll', function() {

    const header    =   document.querySelector('.header');

    if (window.scrollY > 10)    { header.classList.add('scrolled');}
    else                        { header.classList.remove('scrolled');}

});

// Containers for all RSOs
let rsoData = [];

// Get modal elements
const modal             =   document.getElementById("rso-modal");
const modalLogo         =   modal.querySelector(".rso-logo");
const modalIcon         =   modal.querySelector(".rso-name .rso-icon img");
const modalTitle        =   modal.querySelector(".rso-title");
const modalDescription  =   modal.querySelector(".rso-description h3");
const modalEventsList   =   modal.querySelector(".rso-events .item-lists");
const modalOfficersList =   modal.querySelector(".rso-officers .item-lists");
const closeModal        =   modal.querySelector(".close-modal");


// async function for multithreading
async function fetchAllData() {

    // Fetching all the RSOs
    const response      =   await fetch(`${HOST}rso`, { method: 'GET' });
    const responseText  =   await response.text();
    const rsos          =   JSON.parse(responseText);
    const rsoGrid       =   document.getElementById("rso-grid");

    // Iterate through all the RSOs
    rsos.forEach(rso => {

        // Create a card for displaying the RSO
        const rsoCard = document.createElement("div");
        rsoCard.setAttribute('class', 'rso-card');
        rsoCard.setAttribute('data-rso-id', rso.rso_id);
        rsoCard.innerHTML = `
                <div class="rso-icon"><img src="${FILE_DIRECTORY}${rso.logo_path}" alt="${rso.name}"></div>
                <h3>${rso.name}</h3>
                <p>${rso.description}</p>
                <a class="learn-more">Learn More</a>
        `;

        rsoCard.addEventListener("click", async () => {
            
            // Populate modal with placeholder data
            modalLogo.src                   =   `${FILE_DIRECTORY}${rso.logo_path}`;
            modalIcon.src                   =   `${FILE_DIRECTORY}${rso.logo_path}`;
            modalTitle.textContent          =   rso.name;
            modalDescription.textContent    =   rso.description;

            // Get all the events of a specific RSO
            rso.events = [];
            const eventsResponse        =   await fetch(`${HOST}activities/${rso.rso_id}`, {method: 'GET'});
            const eventsResponseText    =   await eventsResponse.text();
            const events                =   JSON.parse(eventsResponseText);
            events.forEach(event => {
                rso.events.push({
                    title:  event.title,
                    image:  event.media_directory
                })
            })

            // Setup HTML for every events
            modalEventsList.innerHTML   =   "";
            rso.events.forEach(event => {
                const li = document.createElement("li");
                li.innerHTML = `

                    <div class="shader hover event-cards">
                        <img class ="main_event"src="${FILE_DIRECTORY}${event.image}" alt="${event.title}">
                    </div>
                    <span>${event.title}</span>

                `;
                modalEventsList.appendChild(li);
            });

            // Get all the officers of a specific RSO
            rso.officers = [];
            const officersResponse      =   await fetch(`${HOST}executives/${rso.rso_id}`, {method: 'GET'});
            const officersResponseText  =   await officersResponse.text();
            const officers              =   JSON.parse(officersResponseText);
            officers.forEach(officer => {
                rso.officers.push({
                    executive_id:   officer.executive_id,
                    name:           `${officer.executive_name} - ${officer.role_name}`,
                    image:          officer.media_directory
                })
            })

            // Setup HTML for every officers
            modalOfficersList.innerHTML     =   "";
            rso.officers.forEach(officer => {
                const li = document.createElement("li");
                li.innerHTML = `

                    <div class="rso-icon hover">
                        <img src="https://randomuser.me/api/portraits/men/${officer.executive_id + 20}.jpg" alt="${officer.name}">
                    </div>
                    <span>${officer.name}</span>

                `;
                modalOfficersList.appendChild(li);
            });

            // Show the modal
            modal.style.display = "flex";
        });

        // Put the RSO in the grid where RSOs are displayed
        rsoGrid.appendChild(rsoCard);

        // Save needed data of the RSO to the rsoData list
        rsoData.push({
            id:             rso.rso_id,
            name:           rso.name,
            description:    rso.description,
            logo:           rso.logo_path,
            icon:           rso.logo_path,
            events:         rso.events,
            officers:       rso.officers
        });
    });
}

// Call the async function
fetchAllData();

// Close modal...
closeModal.addEventListener("click", () => { modal.style.display = "none"; });                          // ...when clicking the close button
modal.addEventListener("click", (e) => { if (e.target === modal) { modal.style.display = "none"; } });  // ...when clicking outside the modal content

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
    let touchStartX     =   0;
    let touchEndX       =   0;

    container.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
    container.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
        const deltaX = touchStartX - touchEndX;
        itemList.scrollLeft += deltaX; // Adjust scroll position
        touchStartX = touchEndX; // Update start position for smooth dragging
    });
});

// Features popup logic (click to open, click outside to close)
const featuresTrigger   =   document.getElementById('features-trigger');
const featuresPopup     =   document.getElementById('features-popup');

if (featuresTrigger && featuresPopup) {

    featuresTrigger.addEventListener('click', (e) => {
        
        e.preventDefault();
        
        const isOpen = featuresPopup.style.display === 'block';

        if (!isOpen) {

            // Temporarily show the popup off-screen to measure its width
            featuresPopup.style.visibility  =   'hidden';
            featuresPopup.style.display     =   'block';
            featuresPopup.style.left        =   '-9999px';
            featuresPopup.style.top         =   '0px';
            
            // Now measure
            const rect          =   featuresTrigger.getBoundingClientRect();
            const popupWidth    =   featuresPopup.offsetWidth;

            let left    =   rect.left + rect.width / 2 - popupWidth / 2;
            let top     =   rect.bottom + window.scrollY;
            
            if (left < 16) left = 16; // Prevent overflow on the left

            // Prevent overflow on the right (leave 32px margin)
            if (left + popupWidth > window.innerWidth - 32) {
                left = window.innerWidth - popupWidth - 32;
                if (left < 16) left = 16;
            }

            featuresPopup.style.left        =   left + 'px';
            featuresPopup.style.top         =   top + 'px';
            featuresPopup.style.visibility  =   'visible';
        } else {
            featuresPopup.style.display =   'none';
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (!featuresPopup.contains(e.target) && !featuresTrigger.contains(e.target)) featuresPopup.style.display = 'none';
    });
}