// Constants
const HOST              =   "http://localhost/rso-management-back/";
const FILE_DIRECTORY    =   "D:/xampp/htdocs/rso-management-back";

// Elements
const activitiesList1           =   document.getElementById('activities-list1');
const activitiesList2           =   document.getElementById('activities-list2');
const activityCount1            =   document.getElementById('activity-count1');
const activityCount2            =   document.getElementById('activity-count2');
const activityCount3            =   document.getElementById('activity-count3');
const activityCount4            =   document.getElementById('activity-count4');
const activityProposalCount1    =   document.getElementById('activity-proposal-count1');
const activityProposalCount2    =   document.getElementById('activity-proposal-count2');
const adviserName1              =   document.getElementById('adviser-name1');
const adviserName2              =   document.getElementById('adviser-name2');
const adviserPicture1           =   document.getElementById('adviser-picture1');
const adviserPicture2           =   document.getElementById('adviser-picture2');
const executivesList1           =   document.getElementById('executives-list1');
const executivesList2           =   document.getElementById('executives-list2');
const membersCount1             =   document.getElementById('members-count1');
const membersCount2             =   document.getElementById('members-count2');
const rsoCount1                 =   document.getElementById('rso-count1');
const rsoCount2                 =   document.getElementById('rso-count2');
const rsoDescription1           =   document.getElementById('rso-description1');
const rsoDescription2           =   document.getElementById('rso-description2');
const rsoDescription3           =   document.getElementById('rso-description3');
const rsoName1                  =   document.getElementById('rso-name1');
const rsoName2                  =   document.getElementById('rso-name2');
const rsoName3                  =   document.getElementById('rso-name3');


// Holder of the fetched data
let fetchedActivities;
let fetchedActivityCount;
let fetchedActivityProposal;
let fetchedActivityProposalCount;
let fetchedAdviser;
let fetchedExecutives;
let fetchedMembersCount;
let fetchedRSO;
let fetchedRSOCount;

async function fetchData(link) {

    const response      =   await fetch(`${HOST}${link}`, { method: 'GET' });
    const responseText  =   await response.text();

    return JSON.parse(responseText);

}

async function fetchAllData() {
    
    fetchedActivities               =   await fetchData('activities/1');
    fetchedActivityCount            =   await fetchData('activitycount');
    fetchedActivityProposal         =   await fetchData('activityproposal');
    fetchedActivityProposalCount    =   await fetchData('proposalcount');
    fetchedExecutives               =   await fetchData('executives/1');
    fetchedMembersCount             =   await fetchData('memberscount');
    fetchedRSO                      =   await fetchData('rso/1');
    fetchedRSOCount                 =   await fetchData('rsocount');

    fetchedAdviser                  =   await fetchData(`user/${fetchedRSO.adviser_id}`);

}

async function displayAllData() {

    rsoName1.textContent                =   fetchedRSO.name;
    rsoDescription1.textContent         =   fetchedRSO.description;
    rsoCount1.textContent               =   fetchedRSOCount.count;
    activityProposalCount1.textContent  =   fetchedActivityProposalCount.count;
    activityCount1.textContent          =   fetchedActivityCount.count - 40;
    membersCount1.textContent           =   fetchedMembersCount.count;
    adviserPicture1.src                 =   `https://randomuser.me/api/portraits/women/${fetchedAdviser.user_id}.jpg`;
    adviserName1.textContent            =   fetchedRSO.adviser_name;
    membersCount2.textContent           =   fetchedMembersCount.count;
    activityCount2.textContent          =   fetchedActivityCount.count - 40;
    activityCount3.textContent          =   fetchedActivityCount.count - 40;
    rsoName2.textContent                =   fetchedRSO.name;
    rsoDescription2.textContent         =   fetchedRSO.description;
    rsoCount2.textContent               =   fetchedRSOCount.count;
    activityProposalCount2.textContent  =   fetchedActivityProposalCount.count;
    activityCount4.textContent          =   fetchedActivityCount.count - 40;
    membersCount2.textContent           =   fetchedMembersCount.count;
    adviserPicture2.src                 =   `https://randomuser.me/api/portraits/women/${fetchedAdviser.user_id}.jpg`;
    adviserName2.textContent            =   fetchedRSO.adviser_name;
    rsoName3.textContent                =   fetchedRSO.name;
    rsoDescription3.textContent         =   fetchedRSO.description;
    
    fetchedExecutives.forEach(executive => {

        const newExecutive1 = document.createElement('div');
        newExecutive1.setAttribute('class', 'flex flex-col space-y-4 p-2 aspect-square items-center justify-center');
        newExecutive1.innerHTML = `
        <div class="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
            <img src="https://randomuser.me/api/portraits/men/${executive.user_id}.jpg" alt="Avatar" class="w-full h-full object-cover">
        </div>
        <div class="w-full flex flex-col">
            <p id="fullnameContainer" class="text-center w-full"><span>${executive.executive_name}</span></p>
            <p id="positionContainer" class="text-xs text-center w-full"><span>${executive.role_name}</span></p>
        </div>
        `;
        executivesList1.appendChild(newExecutive1);
        
        const newExecutive2 = document.createElement('div');
        newExecutive2.setAttribute('class', 'flex flex-col space-y-4 p-2 aspect-square items-center justify-center');
        newExecutive2.innerHTML = `
        <div class="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
            <img src="https://randomuser.me/api/portraits/men/${executive.user_id}.jpg" alt="Avatar" class="w-full h-full object-cover">
        </div>
        <div class="w-full flex flex-col">
            <p id="fullnameContainer" class="text-center w-full"><span>${executive.executive_name}</span></p>
            <p id="positionContainer" class="text-xs text-center w-full"><span>${executive.role_name}</span></p>
        </div>
        `;
        executivesList2.appendChild(newExecutive2);

    });

    fetchedActivities.forEach(activity => {

        const newActivity1 = document.createElement('div');
        newActivity1.setAttribute('class', 'w-[350px] h-[350px] bg-cover bg-center rounded-lg');
        newActivity1.setAttribute('style', `background-image: url('${FILE_DIRECTORY}${activity.media_directory}');`);
        activitiesList1.appendChild(newActivity1);
        
        const newActivity2 = document.createElement('div');
        newActivity2.setAttribute('class', 'w-[350px] h-[350px] bg-cover bg-center rounded-lg');
        newActivity2.setAttribute('style', `background-image: url('${FILE_DIRECTORY}${activity.media_directory}');`);
        activitiesList2.appendChild(newActivity2);

    });

}

async function main() {

    await fetchAllData();
    await displayAllData();

}

main();