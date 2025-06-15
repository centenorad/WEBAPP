
// Calendar logic
const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const monthLabel = document.getElementById('calendar-month-label');
    monthLabel.textContent = `${monthNames[month]} ${year}`;

    // First day of the month (0=Sun, 1=Mon, ...)
    const firstDay = new Date(year, month, 1);
    // Adjust so Monday is first (0=Mon, 6=Sun)
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';
    let day = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < 6; i++) { // 6 weeks
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDay) {
                // Previous month (faded text, no background)
                html += `<td class="text-white/60 text-center py-2">${daysInPrevMonth - startDay + j + 1}</td>`;
            } else if (day > daysInMonth) {
                // Next month (faded text, no background)
                html += `<td class="text-white/60 text-center py-2">${nextMonthDay++}</td>`;
            } else {
                // Current month
                let isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
                let cellClass = isToday ? 'bg-white text-[#232323] text-center py-2 font-semibold' : 'text-center py-2';
                html += `<td class="${cellClass}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
        if (day > daysInMonth) break;
    }
    calendarBody.innerHTML = html;
}

document.getElementById('calendar-prev').onclick = function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
};
document.getElementById('calendar-next').onclick = function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
};

renderCalendar(currentMonth, currentYear);
