
import { error, bold, messageRed, neonGreen } from '../log';
import chalk from 'chalk';

global.console = {
    log: jest.fn()
};

describe('log', () => {

    it('error log', () => {
        error('Dave Grohl');
        expect(global.console.log).toHaveBeenCalledWith(chalk.red.bold('Dave Grohl'));
    });

    it('bold', () => {
        var output = bold('Trent Reznor');
        expect(output).toEqual(chalk.white.bold('Trent Reznor'));
    });

    it('message red', () => {
        var output = messageRed('Scott Weiland');
        expect(output).toEqual(chalk.bold.hex('#f00b47')('Scott Weiland'));
    });

    it('neon green', () => {
        var output = neonGreen('Layne Staley');
        expect(output).toEqual(chalk.hex('#66ff66')('Layne Staley'));
    });

});