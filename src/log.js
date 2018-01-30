import chalk from 'chalk';

const error = msg => {
  console.log(chalk`{red.bold ${msg}}`);
};

const bold = msg => chalk`{white.bold ${msg}}`;

const messageRed = msg => chalk`{bold.hex('#f00b47') ${msg}}`;

const neonGreen = msg => chalk`{hex('#66ff66') ${msg}}`;

export { error, bold, messageRed, neonGreen };