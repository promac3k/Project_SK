
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
    { name: 'Setembro', days: 30, firstDay: 5, year: 2023 },
    { name: 'Outubro', days: 31, firstDay: 0, year: 2023 },
    { name: 'Novembro', days: 30, firstDay: 3, year: 2023 },
    { name: 'Dezembro', days: 31, firstDay: 5, year: 2023 },
    { name: 'Janeiro', days: 31, firstDay: 1, year: 2023 },
    { name: 'Fevereiro', days: 28, firstDay: 4, year: 2023 },
    { name: 'Março', days: 31, firstDay: 5, year: 2023 },
    { name: 'Abril', days: 30, firstDay: 1, year: 2023 },
    { name: 'Maio', days: 31, firstDay: 3, year: 2023 },
    { name: 'Junho', days: 30, firstDay: 6, year: 2023 },
    { name: 'Julho', days: 31, firstDay: 1, year: 2023 },
    { name: 'Agosto', days: 31, firstDay: 4, year: 2023 },
    { name: 'Setembro', days: 30, firstDay: 7, year: 2024 },
  ];


  for (let i = 0; i < months.length; i++) {
    const monthRow = document.createElement('tr');
    monthRow.innerHTML = `<td class="month">${months[i].name}</td>`;

    // Obtém o primeiro dia do mês e o número total de dias
    const firstDay = months[i].firstDay;
    const daysInMonth = months[i].days;
    const year = months[i].year;

    // Adicione células vazias para os dias anteriores ao primeiro dia do mês
    for (let j = 0; j < firstDay; j++) {
      monthRow.innerHTML += '<td class="empty"></td>';
    }

    //Adicione células diárias para o mês inteiro com IDs distintos
    for (let day = 1; day <= daysInMonth; day++) {
      const dayId = `${months[i].name}-${day}-${year}`;
      const td = document.createElement('td');
      td.id = dayId;
      td.className = 'number';
      td.onclick = function () {
        alert(this.id);
      };
      const span = document.createElement('span');
      span.onmouseover = function () {
        // Altera a cor do número quando o mouse passa sobre ele
        this.style.color = "red";
      };
      span.onmouseout = function () {
        // Retorna à cor original quando o mouse sai do número
        this.style.color = "";
      };
      span.textContent = day;
      td.appendChild(span);
      monthRow.appendChild(td);
    }

    calendarBody.appendChild(monthRow);
  }
  
}
function generateBlocos() {
  document.addEventListener("DOMContentLoaded", function () {
    // Adiciona os valores
    var table = document.getElementById("floorTable");
    var roomCounts = table.dataset.roomCounts.split(",").map(Number);
    var startingRoomNumbers = table.dataset.startingRoomNumbers.split(",").map(Number);
    var roomPrefix = table.dataset.roomPrefix; 
    var transitionRoomNumber = table.dataset.transitionRoomNumber; 
    var customRoomNumber = table.dataset.customRoomNumber;
    var tableBody = document.getElementById("tableBody");

    for (var floor = 0; floor < roomCounts.length; floor++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + (floor + 1) + "</td>"
        
        // Adiciona células para cada sala do andar atual
        for (var room = 1; room <= roomCounts[floor]; room++) {
            var roomNumber = startingRoomNumbers[floor] + room;

            // Verifiqua se o número da sala atual corresponde ao ponto de transição
            if (roomNumber > transitionRoomNumber) {
              roomNumber = customRoomNumber++;
            }
            
            // Combina tudo para formar um ID distinto
            const cellId = "floor" + (floor + 1) + "_room" + roomNumber;

            // Cria um novo elemento td
            var td = document.createElement('td');
            td.id = cellId;
            td.textContent = roomPrefix + roomNumber;

            // Adiciona os eventos onmousemove e onmouseout
            td.onmousemove = function () {
                // Adiciona um estilo à borda quando o mouse se move sobre a célula
                this.style.backgroundColor = "red";
            };
            td.onmouseout = function () {
                // Remove o estilo da borda quando o mouse sai da célula
                this.style.backgroundColor = "";
            };
            td.onclick = function () {
              alert(this.id);
            };

            // Adiciona o elemento td à linha
            row.appendChild(td);
        }
        tableBody.appendChild(row);
    }
  });
}