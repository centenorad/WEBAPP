// toggle menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.left-header nav');

// Toggle menu on click (for mobile)
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Optional: Show menu on hover (for desktop)
menuToggle.addEventListener('mouseenter', () => {
    nav.classList.add('active');
});
nav.addEventListener('mouseleave', () => {
    nav.classList.remove('active');
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// //observer for fade-in effect
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         console.log(entry);
//         // Check if the element is intersecting (visible in viewport)
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//             // Optionally, unobserve the element after it has been shown
//             observer.unobserve(entry.target);


//         } else {    
//             entry.target.classList.remove('show');
//         }
//     });
// }, {
//     threshold: 0.1 // Adjust this value to control when the fade-in effect triggers
// });

// // Smooth scroll anuimations
// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => {
//     observer.observe(el);
// });

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
        const rso = rsoData.find(item => item.id === rsoId);

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