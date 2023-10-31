function setDarkModeCookie(value, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "darkMode=" + value + ";" + expires + ";path=/";
}
  
// Função para ler o valor do cookie
function getDarkModeCookie() {
    const name = "darkMode=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
        }
        }
    return "";
}