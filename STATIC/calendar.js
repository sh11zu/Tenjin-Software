document.addEventListener('DOMContentLoaded', function() {
    var daysContainer = document.querySelector('.days');
    var selectedDayElement = document.querySelector('.selected-day');
    var sidebarTitleElement = document.querySelector('.sidebar-panel h2');
    const yearDisplay = document.getElementById('year-display');
    const headerContainer = document.querySelector('.header-container');
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const endYear = 2050;
    let month = new Date().getMonth();
    let year = currentYear;

    // Ensure the calendar container maintains position
    const calendarContainer = document.querySelector('.calendar-container');
    calendarContainer.style.position = 'relative';

    const yearCalendarContainer = document.querySelector('.year-calendar');

    // Create year calendar with pagination
 
 


    yearDisplay.addEventListener('click', function() {
        if (yearCalendarContainer.style.display === 'grid') {
            yearCalendarContainer.style.display = 'none';
            document.querySelector('.calendar').style.display = 'block';
            headerContainer.classList.remove('header-container-year');
            headerContainer.classList.add('header-container');
        } else {
            yearCalendarContainer.innerHTML = createYearCalendar(startYear, endYear, year);
            yearCalendarContainer.style.display = 'grid';
            document.querySelector('.calendar').style.display = 'none';
            headerContainer.classList.remove('header-container');
            headerContainer.classList.add('header-container-year');
        }
    });

    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const currentDate = new Date();

    function renderCalendar(selectedDay = null) {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(year, month, 0).getDate();

        let days = "";

        for (let i = firstDayOfMonth; i > 0; i--) {
            days += `<li class="inactive prev-month-day">${lastDateOfLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "calendar-current-day calendar-active" : "";
            let isSelected = selectedDay && i === selectedDay ? "calendar-active" : "";
            days += `<li class="${isToday} ${isSelected}">${i}</li>`;
        }

        for (let i = lastDayOfMonth; i < 6; i++) {
            days += `<li class="inactive next-month-day">${i - lastDayOfMonth + 1}</li>`;
        }

        document.querySelector('.month-name').innerText = `${months[month]}`;
        document.getElementById('year-display').innerText = `${year}`;  // Update year in the header
        daysContainer.innerHTML = days;
        addDayClickEvent();
    }

    function addDayClickEvent() {
        const dayElements = daysContainer.querySelectorAll('li');
        dayElements.forEach(day => {
            day.addEventListener('click', function() {
                if (this.classList.contains('prev-month-day')) {
                    month = month === 0 ? 11 : month - 1;
                    year = month === 11 ? year - 1 : year;
                    renderCalendar(parseInt(this.innerText));
                } else if (this.classList.contains('next-month-day')) {
                    month = month === 11 ? 0 : month + 1;
                    year = month === 0 ? year + 1 : year;
                    renderCalendar(parseInt(this.innerText));
                } else {
                    const selectedDay = this.innerText;
                    const selectedDate = new Date(year, month, selectedDay);
                    const dayOfWeek = daysOfWeek[selectedDate.getDay()];
                    const fullDate = `${dayOfWeek} ${selectedDay} ${months[month]} ${year}`;
                    sidebarTitleElement.innerText = fullDate;
                    selectedDayElement.innerText = `Aucun événement à afficher ce jour.`; // Placeholder for events
                    selectedDayElement.style.color = 'gray'; // Set color to gray
                    selectedDayElement.style.fontStyle = 'italic'; // Set font style to italic
                    dayElements.forEach(d => d.classList.remove('calendar-active'));
                    this.classList.add('calendar-active');
                    if (this.classList.contains('calendar-current-day')) {
                        this.classList.add('calendar-current-day'); // Re-apply current-day class if it's today
                    }
                }
            });
        });
    }

    document.getElementById('prev').addEventListener('click', () => {
        month = month === 0 ? 11 : month - 1;
        year = month === 11 ? year - 1 : year;
        renderCalendar();
    });

    document.getElementById('next').addEventListener('click', () => {
        month = month === 11 ? 0 : month + 1;
        year = month === 0 ? year + 1 : year;
        renderCalendar();
    });

    document.getElementById('go-today').addEventListener('click', () => {
        month = currentDate.getMonth();
        year = currentDate.getFullYear();
        renderCalendar(currentDate.getDate());
    });

    // Set current date on page load
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const fullDate = `${dayOfWeek} ${currentDate.getDate()} ${months[month]} ${year}`;
    sidebarTitleElement.innerText = fullDate;
    selectedDayElement.innerText = `Aucun événement à afficher ce jour.`; // Placeholder for events
    selectedDayElement.style.color = 'gray'; // Set color to gray
    selectedDayElement.style.fontStyle = 'italic'; // Set font style to italic

    renderCalendar(currentDate.getDate());
});
