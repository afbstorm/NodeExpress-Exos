// Module externe
const chalk = require('chalk');

//Module interne
const math = require('./modules/math')

console.log('Démo de module NodeJs');
console.log(chalk.cyan('Allez en pause'));

console.log(math.addition(2,2,56, '10'))