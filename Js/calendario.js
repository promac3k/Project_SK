
    function generateCalendar() {
      const calendarBody = document.getElementById('calendar-body');

      const months = [
        { name: 'Setembro', days: 30, firstDay: 5 },
        { name: 'Outubro', days: 31, firstDay: 0 },
        { name: 'Novembro', days: 30, firstDay: 3 },
        { name: 'Dezembro', days: 31, firstDay: 5 },
        { name: 'Janeiro', days: 31, firstDay: 1},
        { name: 'Fevereiro', days: 28, firstDay: 4 },
        { name: 'Março', days: 31, firstDay: 5 },
        { name: 'Abril', days: 30, firstDay: 1 },
        { name: 'Maio', days: 31, firstDay: 3 },
        { name: 'June', days: 30, firstDay: 6 },
        { name: 'Julho', days: 31, firstDay: 1 },
        { name: 'Agosto', days: 31, firstDay: 4 }
      ];

      for (let i = 0; i < months.length; i++) {
        const monthRow = document.createElement('tr');
        monthRow.innerHTML = `<td>${months[i].name}</td>`;

        // Get the first day of the month and the total number of days
        const firstDay = months[i].firstDay;
        const daysInMonth = months[i].days;

        // Add empty cells for the days before the first day of the month
        for (let j = 0; j < firstDay; j++) {
          monthRow.innerHTML += '<td class="empty"></td>';
        }

        // Add day cells for the entire month with distinctive IDs
        for (let day = 1; day <= daysInMonth; day++) {
          const dayId = `${months[i].name}-${day}`;
          monthRow.innerHTML += `<td id="${dayId}">${day}</td>`;
        }

        calendarBody.appendChild(monthRow);
      }
    }

    // Generate the calendar when the page loads
    window.onload = generateCalendar;
