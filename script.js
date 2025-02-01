
document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.getElementById("days");
    const monthYear = document.getElementById("monthYear");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");
    const modal = document.getElementById("eventModal");
    const closeModal = document.querySelector(".close");
    const eventTitle = document.getElementById("eventTitle");
    const saveEvent = document.getElementById("saveEvent");

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {};

    function renderCalendar() {
        daysContainer.innerHTML = "";
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += `<div class="empty"></div>`;
        }

        for (let day = 1; day <= lastDate; day++) {
            let dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
            let eventText = events[dateStr] ? `<span>${events[dateStr]}</span>` : "";

            daysContainer.innerHTML += `<div class="day" data-date="${dateStr}">${day} ${eventText}</div>`;
        }
    }

    daysContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("day")) {
            modal.style.display = "block";
            modal.dataset.selectedDate = e.target.dataset.date;
        }
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    saveEvent.addEventListener("click", function () {
        let dateStr = modal.dataset.selectedDate;
        events[dateStr] = eventTitle.value;
        localStorage.setItem("events", JSON.stringify(events));
        modal.style.display = "none";
        renderCalendar();
    });

    prevMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
