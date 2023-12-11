const bcrypt = require('bcrypt');

async function comparePasswords(inputPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, hashedPassword, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function hashPassword(password) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

module.exports = {
    comparePasswords,
    hashPassword
};