document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    const daysContainer = document.getElementById("days");
    const monthYear = document.getElementById("monthYear");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");

    if (!daysContainer || !monthYear || !prevMonth || !nextMonth) {
        console.error("One or more elements are missing in the HTML!");
        return;
    }

    let currentDate = new Date();
    
    function renderCalendar() {
        console.log("Rendering Calendar...");
        daysContainer.innerHTML = "";
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += `<div class="empty"></div>`;
        }

        for (let day = 1; day <= lastDate; day++) {
            daysContainer.innerHTML += `<div class="day">${day}</div>`;
        }
    }

    prevMonth.addEventListener("click", function () {
        console.log("Previous Month Clicked");
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener("click", function () {
        console.log("Next Month Clicked");
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
