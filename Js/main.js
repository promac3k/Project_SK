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