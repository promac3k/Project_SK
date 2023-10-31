// Função para definir o cookie do modo escuro
function setDarkModeCookie(isDarkMode, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "darkMode=" + (isDarkMode ? '1' : '0') + ";" + expires + ";path=/";
}

// Função para ler o valor do cookie do modo escuro
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
            return cookie.substring(name.length, cookie.length) === '1';
        }
    }
    return null;
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    const isDarkMode = getDarkModeCookie();
    if (isDarkMode === null || isDarkMode === false) {
        setDarkModeCookie(true, 30);  // Ativar o modo escuro
    } else {
        setDarkModeCookie(false, 30);  // Desativar o modo escuro
    }
}