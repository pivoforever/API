const bcrypt = require('bcrypt');
const saltRounds = 10;
//const password = 'pivonever@gmail.com';
const passwordEncrypt = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
console.log(passwordEncrypt('pivonever@gmail.com').String());

const hashedTextPassword = passwordEncrypt('pivonever@gmail.com').String();
const plainTextPassword = '123456';

const checkPassword = async (plainTextPassword, hashedTextPassword) => {
  return await bcrypt.compare(hashedTextPassword, plainTextPassword);
};
console.log(checkPassword(plainTextPassword, hashedTextPassword));
