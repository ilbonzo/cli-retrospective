jest.mock('../log');
jest.mock('../command');
jest.mock('../config');

const _exit = process.exit;

let log;
let command;
let config;

const setup = (configExistValue) => {
    log = require('../log');
    log.error = jest.fn();
    log.bold = jest.fn(s => s);
    command = require('../command');
    command.setupProgram = jest.fn( (a) => {
        a();
    });
    command.lsMilestone = jest.fn();
    command.getMilestone = jest.fn();
    config = require('../config');
    if (typeof configExistValue === 'undefined') {
        configExistValue = true;
    }
    config.configExist = jest.fn( () => {
        return configExistValue;
    });
    config.configGetValues = jest.fn();
    require('../cli');
};

describe('cli', () => {
    beforeEach(() => {
        process.exit = jest.fn();
        global.console = {
            log: jest.fn(),
            error: jest.fn()
        };
    });

    afterEach(() => {
        process.exit = _exit;
        jest.resetModules();
    });

    it('should call didYouMean when the command is similar to specific commands', () => {
        process.argv = ['node', 'bin/cli.js', 'mileston'];
        setup();

        expect(log.error.mock.calls.length).toBe(2);
        expect(log.error.mock.calls[0][0]).toBe(
            `Unknown command: ${log.bold('mileston')}`
        );
        expect(log.error.mock.calls[1][0]).toBe(
            `Did you mean ${log.bold('milestone')} ?`
        );
        expect(process.exit).toBeCalledWith(1);
    });

    it('should call error when the command not matched', () => {
        process.argv = ['node', 'bin/cli.js', 'mm'];
        setup();

        expect(log.error).toBeCalledWith(`Unknown command: ${log.bold('mm')}`);
        expect(process.exit).toBeCalledWith(1);
    });

    describe('setup command', () => {
        it('should call setup', () => {
            process.argv = ['node', 'bin/cli.js', 'setup'];
            setup();

            expect(command.setupProgram.mock.calls.length).toBe(1);
        });

        it('should call setup with --help', () => {
            process.argv = ['node', 'bin/cli.js', 'setup', '--help'];
            setup();

            expect(global.console.log).toHaveBeenCalledWith('  Setup your cli-retrospective');
        });

        it('view initial message when call program without options and parameters first time', () => {
            process.argv = ['node', 'bin/cli.js'];
            setup(false);

            jest.spyOn(global.console, 'log');
            expect(global.console.log).toHaveBeenCalledWith('');
        });

        // it('setup when call program with setup first time', () => {
        //     process.argv = ['node', 'bin/cli.js', 'setup'];
        //     setup(false);

        //     expect(command.setupProgram.mock.calls.length).toBe(1);
        // });
    });

    describe('ls-milestone command', () => {
        it('should call ls-milestone', () => {
            process.argv = ['node', 'bin/cli.js', 'ls-milestone'];
            setup();

            expect(command.lsMilestone.mock.calls.length).toBe(1);
        });

        it('should call ls-milestone with --help', () => {
            process.argv = ['node', 'bin/cli.js', 'ls-milestone', '--help'];
            setup();

            expect(global.console.log).toHaveBeenCalledWith('  Get list of all milestone.');
        });
    });

    describe('milestone command', () => {
        it('should call milestone', () => {
            process.argv = ['node', 'bin/cli.js', 'milestone', '10.10.x'];
            setup();

            expect(command.getMilestone.mock.calls.length).toBe(1);
        });

        it('should call milestone with --help', () => {
            process.argv = ['node', 'bin/cli.js', 'milestone', '--help'];
            setup();

            expect(global.console.log).toHaveBeenCalledWith('  Get list of issue in milestone.');
        });
    });

    describe('--help options', () => {
        it('view help when call program without options and parameters', () => {
            process.argv = ['node', 'bin/cli.js'];
            setup();

            jest.spyOn(global.console, 'log');
            expect(global.console.log).toHaveBeenCalledWith('');
        });

        it('should call --help', () => {
            process.argv = ['node', 'bin/cli.js', '--help'];
            setup();

            jest.spyOn(global.console, 'log');
            expect(global.console.log).toHaveBeenCalledWith('');
            expect(process.exit).toBeCalledWith(1);
        });
    });

});