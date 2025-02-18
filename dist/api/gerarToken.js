"use strict";
const generateToken = (length) => {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};
const token = generateToken(32);
console.log(token);
//# sourceMappingURL=gerarToken.js.map