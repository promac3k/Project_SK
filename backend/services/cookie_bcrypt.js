const CryptoJS = require('crypto-js');
const SECRET_KEY = process.env.SECRET_KEY;


// Function to encrypt text
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// Function to decrypt text
function decrypt(text) {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
};
