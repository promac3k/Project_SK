
console.log("main.js loaded");

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let theme = getCookie("theme");
  const currentUrl = window.location.href;
  console.log(currentUrl);
  if (theme != "") {
    console.log("Theme used is " + theme);
    var checkBox = document.getElementById("switchon");
    if (theme == "light") {
      console.log("Seleccionado light >>");
      // aqui tem de ir codigo para colocar bem o switch do lado esquerdo
      checkBox.checked = false;
    }
    if (theme == "dark") {
      console.log("Seleccionado dark >>");
      // aqui tem de ir codigo para colocar bem o switch do lado direito
      checkBox.checked = true;
      var element = document.body;
      element.classList.toggle("dark-mode");
    }

  } else {
    // Por default vamos colocar light e sete dias
    setCookie("theme", "light", 7);
  }
  //location.reload();
}

function mySwitch() {
  var checkBox = document.getElementById("switchon");
  console.log("é dark? " + checkBox.checked);

  if (checkBox.checked == true) {
    setCookie("theme", "dark", 7);
    var element = document.body;
    element.classList.toggle("dark-mode");
    checkBox.checked = true;
  } else {
    setCookie("theme", "light", 7);
    checkBox.checked = false;
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
}


function goBack() {
  window.location.replace(document.referrer);
}


function generateCalendar() {
  const calendarBody = document.getElementById('calendar-body');

  const months = [
    { name: 'Setembro', days: 30, firstDay: 5, lastday: 2 },
    { name: 'Outubro', days: 31, firstDay: 0, lastday: 6 },
    { name: 'Novembro', days: 30, firstDay: 3, lastday: 4 },
    { name: 'Dezembro', days: 31, firstDay: 5, lastday: 1 },
    { name: 'Janeiro', days: 31, firstDay: 1, lastday: 5 },
    { name: 'Fevereiro', days: 28, firstDay: 4, lastday: 5 },
    { name: 'Março', days: 31, firstDay: 5, lastday: 1 },
    { name: 'Abril', days: 30, firstDay: 1, lastday: 6 },
    { name: 'Maio', days: 31, firstDay: 3, lastday: 3 },
    { name: 'Junho', days: 30, firstDay: 6, lastday: 1 },
    { name: 'Julho', days: 31, firstDay: 1, lastday: 5 },
    { name: 'Agosto', days: 31, firstDay: 4, lastday: 2 },
    { name: 'Setembro', days: 30, firstDay: 7, lastday: 2 },
  ];


  for (let i = 0; i < months.length; i++) {
    const monthRow = document.createElement('tr');
    monthRow.innerHTML = `<td class="month">${months[i].name}</td>`;

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