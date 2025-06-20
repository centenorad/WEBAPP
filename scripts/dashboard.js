document.addEventListener('DOMContentLoaded', () => {
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');
    const overlays = document.querySelectorAll('.overlay');

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            overlays.forEach(overlay => {
                overlay.classList.add('hidden');
            });
        });
    });

    const newRsoOverlay = document.getElementById("new-rso-overlay");
    const editButtons = document.querySelectorAll('button[title="Edit"]');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (newRsoOverlay) {
                newRsoOverlay.classList.remove('hidden');
            }
        });
    });
    const proposalOverlay = document.getElementById("proposal-overlay");
    const showButtons = document.querySelectorAll('.proposal-show');
    showButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (proposalOverlay) {
                proposalOverlay.classList.remove('hidden');
            }
        });
    });
});

// Constants
const HOST              =   "http://localhost/rso-management-back/";
const FILE_DIRECTORY    =   "D:/xampp/htdocs/rso-management-back";

// Elements
const activeRSOCount1           =   document.getElementById('active-rso-count1');
const activeRSOCount2           =   document.getElementById('active-rso-count2');
const activeRSOCount3           =   document.getElementById('active-rso-count3');
const activeRSOCount4           =   document.getElementById('active-rso-count4');
const activeRSOCount5           =   document.getElementById('active-rso-count5');
const userCount1                =   document.getElementById('user-count1');
const userCount2                =   document.getElementById('user-count2');
const userCount3                =   document.getElementById('user-count3');
const approvedProposalCount1    =   document.getElementById('proposal-count1');
const approvedProposalCount2    =   document.getElementById('proposal-count2');
const approvedProposalCount3    =   document.getElementById('proposal-count3');
const approvedProposalCount4    =   document.getElementById('proposal-count4');
const approvedProposalCount5    =   document.getElementById('proposal-count5');
const approvedProposalList1     =   document.getElementById('activity-proposal-list1');
const newRSOList1               =   document.getElementById('new-rso-list1');
const activitiesList1           =   document.getElementById('activities-list1');
const newRSOProposalList1       =   document.getElementById('new-rso-proposal-list1');
const newActivityProposalList1  =   document.getElementById('new-activity-proposal-list1');
const renewedRSOCount           =   document.getElementById('renewed-rso-count');
const renewalCount1             =   document.getElementById('renewal-count1');
const renewalList1              =   document.getElementById('renewal-list1');
const userList1                 =   document.getElementById('user-list1');
const rsoList1                  =   document.getElementById('rso-list1');

// Holder of the fetched data
let fetchedRSOCount;
let fetchedUserCount;
let fetchedProposalCount;
let fetchedActivityProposal;
let fetchedRenewalCount;
let fetchedRenewal;
let fetchedRSO;
let fetchedActivities;
let fetchedRSOProposal;
let fetchedUsers;

async function fetchData(link) {

    const response      =   await fetch(`${HOST}${link}`, { method: 'GET' });
    const responseText  =   await response.text();

    return JSON.parse(responseText);

}

async function fetchAllData() {

    fetchedRSOCount         =   await fetchData('rsocount');
    fetchedUserCount        =   await fetchData('usercount');
    fetchedProposalCount    =   await fetchData('proposalcount');
    fetchedActivityProposal =   await fetchData('activityproposal');
    fetchedRenewalCount     =   await fetchData('renewalcount');
    fetchedRenewal          =   await fetchData('renewal');
    fetchedRSO              =   await fetchData('rso');
    fetchedActivities       =   await fetchData('activities');
    fetchedRSOProposal      =   await fetchData('rsoapplication');
    fetchedUsers            =   await fetchData('user');

}

async function displayAllData() {

    activeRSOCount1.textContent         =   fetchedRSOCount.count;
    activeRSOCount2.textContent         =   fetchedRSOCount.count;
    activeRSOCount3.textContent         =   fetchedRSOCount.count;
    activeRSOCount4.textContent         =   fetchedRSOCount.count;
    activeRSOCount5.textContent         =   fetchedRSOCount.count;
    userCount1.textContent              =   fetchedUserCount.count;
    userCount2.textContent              =   fetchedUserCount.count;
    userCount3.textContent              =   fetchedUserCount.count;
    approvedProposalCount1.textContent  =   fetchedProposalCount.count;
    approvedProposalCount2.textContent  =   fetchedProposalCount.count;
    approvedProposalCount3.textContent  =   fetchedProposalCount.count;
    approvedProposalCount4.textContent  =   fetchedProposalCount.count;
    approvedProposalCount5.textContent  =   fetchedProposalCount.count + 2;
    renewedRSOCount.textContent         =   fetchedRSOCount.count - fetchedRenewalCount.count;
    renewalCount1.textContent           =   fetchedRenewalCount.count;

    fetchedActivityProposal.forEach(proposal => {

        const newProposal = document.createElement('div');
        newProposal.setAttribute('class', 'bg-[#353535] rounded-lg px-6 py-4 flex items-center justify-between');
        newProposal.innerHTML = `
            <div class="flex items-center gap-4 min-w-0">
                <div class="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                    <img src="${FILE_DIRECTORY}${proposal.rso_logo}" />
                </div>
                <span class="text-white font-medium text-base whitespace-nowrap">${proposal.rso_name}</span>
                <span class="text-white/80 text-base truncate">IoT Seminar</span>
                <span class="text-white/80 text-base whitespace-nowrap">June 2, 2025</span>
                <span class="text-white/80 text-base whitespace-nowrap">Proponent</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="ml-2 px-3 py-1 rounded bg-[#2B3F2B] text-green-400 text-xs font-semibold">Pending</span>
                <button class="w-9 h-9 flex items-center justify-center rounded-full bg-[#232323] border border-[#5B5BFF] text-[#5B5BFF] text-xl" title="Show Details"><i class='bx bx-show'></i></button>
                <button class="uppercase font-bold text-xs px-5 py-2 rounded border border-[#5B5BFF] text-white bg-gradient-to-r from-[#5B5BFF] to-[#7F53FF] hover:from-[#7F53FF] hover:to-[#5B5BFF] transition">Approve</button>
                <button class="uppercase font-bold text-xs px-5 py-2 rounded border border-white text-white bg-transparent hover:bg-white hover:text-[#232323] transition">Reject</button>
            </div>
        `;

        approvedProposalList1.appendChild(newProposal);

        const newActivityProposal = document.createElement('tr');
        newActivityProposal.setAttribute('class', 'even:bg-[#16224a]');
        newActivityProposal.innerHTML = `
            <td class="py-3 flex items-center gap-3">
                <div class="rounded-full bg-cyan-400 w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/${proposal.submitted_by_id}.jpg" alt="Avatar ${proposal.submitted_by_id}" class="w-full h-full object-cover" />
                </div>
                <div>
                    <div class="text-white font-medium leading-tight">${proposal.submitted_by_name}</div>
                    <div class="text-white/70 text-xs leading-tight">${proposal.email}</div>
                </div>
            </td>
            <td class="py-3 text-white/80">activity${proposal.proposal_id}.pdf</td>
            <td class="py-3"><span class="px-3 py-1 rounded bg-[#2B3F2B] text-green-400 text-xs font-semibold">Pending</span></td>
            <td class="py-3 text-center"><i class='bx bx-show text-lg text-white/70 cursor-pointer'></i></td>
        `;
        newActivityProposalList1.appendChild(newActivityProposal);
        
    });

    fetchedRSO.forEach(rso => {

        const newRSO1 = document.createElement('tr');
        newRSO1.innerHTML = `
            <td class="py-3 flex items-center gap-3">
                <div class="rounded-full w-9 h-9 flex items-center justify-center overflow-hidden">
                    <img src="${FILE_DIRECTORY}${rso.logo_path}" />
                </div>
                <span class="text-white">${rso.name}</span>
            </td>
            <td class="py-3 text-white/80">Dec 30, 10:06</td>
            <td class="py-3 text-white/80">approved.docs</td>
        `;
        newRSOList1.appendChild(newRSO1);

        const newRSO2 = document.createElement('div');
        newRSO2.setAttribute('class', 'bg-transparent border border-blue-400 rounded-lg p-6 flex flex-col min-h-[180px]');
        newRSO2.innerHTML = `
            <div class="flex items-center gap-4 mb-2">
                <div class="rounded-full bg-cyan-400 w-8 h-8 flex items-center justify-center overflow-hidden">
                    <img src="${FILE_DIRECTORY}${rso.logo_path}" />
                </div>
                <span class="text-white text-lg font-semibold">${rso.name}</span>
            </div>
            <div class="text-white/80 text-sm mb-6">${rso.description}</div>
            <a class="text-cyan-400 text-sm font-medium mt-auto hover:underline">Learn More</a>
        `;
        rsoList1.appendChild(newRSO2);
    });

    fetchedActivities.forEach(activity => {

        const newActivity = document.createElement('div');
        newActivity.setAttribute('class', 'bg-[#353535] rounded-lg px-6 py-4 flex items-center gap-4');
        newActivity.innerHTML = `
            <div class="rounded-full w-20 h-12 flex items-center justify-center overflow-hidden">
                <img src="${FILE_DIRECTORY}${activity.rso_logo}" />
            </div>
            <span class="text-white font-medium text-base whitespace-nowrap">${activity.rso_name}</span>
            <span class="text-white/80 text-base truncate">${activity.title}</span>
            <span class="text-white/80 text-base whitespace-nowrap">June 2, 2025</span>
        `;
        activitiesList1.appendChild(newActivity);

    });

    fetchedRSOProposal.forEach(proposal => {

        const newProposal = document.createElement('tr');
        newProposal.innerHTML = `
            <td class="py-3 flex items-center gap-3">
                <i class='bx bx-show text-lg text-white/70'></i>
                <div class="rounded-full bg-cyan-400 w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/${proposal.application_id}.jpg" alt="Avatar ${proposal.application_id}" class="w-full h-full object-cover" />
                </div>
                <div>
                    <div class="text-white font-medium leading-tight">${proposal.submitted_by}</div>
                    <div class="text-white/70 text-xs leading-tight">${proposal.email}</div>
                </div>
            </td>
            <td class="py-3 text-white/80">application${proposal.application_id}.docx</td>
            <td class="py-3"><span class="px-3 py-1 rounded bg-[#2B3F2B] text-green-400 text-xs font-semibold">Pending</span></td>
            <td class="py-3 flex gap-2 justify-end">
                <button class="text-white/70 hover:text-white" title="Edit"><i class='bx bx-pencil'></i></button>
                <button class="text-white/70 hover:text-white" title="Delete"><i class='bx bx-trash'></i><span class="sr-only">Delete</span></button>
            </td>
        `
        newRSOProposalList1.appendChild(newProposal);

    });

    fetchedRenewal.forEach(renewal => {

        const newRenewal = document.createElement('tr');
        newRenewal.setAttribute('class', 'even:bg-[#16224a]');
        newRenewal.innerHTML = `
            <td class="py-3 flex items-center gap-3">
                <button class="text-white/70 hover:text-white" title="Show Details"><i class='bx bx-show'></i></button>
                <div class="rounded-full bg-cyan-400 w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/${renewal.application_id}.jpg" alt="Avatar ${renewal.application_id}" class="w-full h-full object-cover" />
                </div>
                <div>
                    <div class="text-white font-medium leading-tight">${renewal.submitted_by}</div>
                    <div class="text-white/70 text-xs leading-tight">${renewal.email}</div>
                </div>
            </td>
            <td class="py-3 text-white/80">renewal form ${renewal.application_id}.doc</td>
            <td class="py-3"><span class="px-3 py-1 rounded bg-[#2B3F2B] text-green-400 text-xs font-semibold">Pending</span></td>
            <td class="py-3 flex gap-2 justify-end">
                <button type="button" class="text-white/70 hover:text-white" title="Edit"><i class='bx bx-pencil'></i><span class="sr-only">Edit</span></button>
                <button class="text-white/70 hover:text-white" title="Delete"><i class='bx bx-trash'></i><span class="sr-only">Delete</span></button>
            </td>
        `;
        renewalList1.appendChild(newRenewal);

    });

    fetchedUsers.forEach(user => {

        const newUsers = document.createElement('tr');
        newUsers.setAttribute('class', 'even:bg-[#16224a]');
        newUsers.innerHTML = `
            <td class="py-3 flex items-center gap-3">
                <button class="text-white/70 hover:text-white" title="Show Details"><i class='bx bx-show'></i></button>
                <div class="rounded-full bg-cyan-400 w-10 h-10 flex items-center justify-center overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/${user.user_id}.jpg" alt="Avatar 1" class="w-full h-full object-cover" />
                </div>
                <div>
                <div class="text-white font-medium leading-tight">${user.first_name} ${user.last_name}</div>
                <div class="text-white/70 text-xs leading-tight">${user.email}</div>
                </div>
            </td>
            <td class="py-3"><span class="px-3 py-1 rounded bg-[#2B3F2B] text-green-400 text-xs font-semibold">Active</span></td>
            <td class="py-3 flex gap-2 justify-end">
                <button type="button" class="text-white/70 hover:text-white" title="Edit" aria-label="Edit"><i class='bx bx-pencil'></i></button>
                <button type="button" class="text-white/70 hover:text-white" title="Delete" aria-label="Delete"><i class='bx bx-trash'></i></button>
            </td>
        `;
        userList1.appendChild(newUsers);

    });

}

async function main() {

    await fetchAllData();
    await displayAllData();

}

main();