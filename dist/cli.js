'use strict';

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['{bold.hex(\'#0069b9\') ZenHub Retrospective}'], ['{bold.hex(\'#0069b9\') ZenHub Retrospective}']);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _didyoumean = require('didyoumean');

var _didyoumean2 = _interopRequireDefault(_didyoumean);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('./config');

var _log = require('./log');

var _command = require('./command');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configured = (0, _config.configExist)();

_commander2.default.command('setup').on('--help', function () {
    console.log('');
    console.log('  Setup your cli-retrospective');
    console.log('');
    console.log('  Example:');
    console.log('           ' + (0, _log.neonGreen)('zenhub-retrospective setup') + '    => insert your github credentials');
    console.log('');
}).action(function (name, options) {
    (0, _command.setupProgram)(function () {
        console.log('  ' + (0, _log.neonGreen)('zenhub-retrospective setup done'));
    });
});

_commander2.default.on('--help', function () {
    console.log('');
    console.log('');
    console.log('  ' + (0, _log.messageRed)('Welcome') + ' to ' + (0, _chalk2.default)(_templateObject) + '!');
    console.log('');
    console.log('  Wanna setup program please enter: ' + (0, _log.neonGreen)('zenhub-retrospective setup'));
    console.log('  Wanna watch list of milestones please enter: ' + (0, _log.neonGreen)('zenhub-retrospective ls-milestone'));
    console.log('  Wanna check issue in milestone please enter: ' + (0, _log.neonGreen)('zenhub-retrospective milestone <milestone>'));
    console.log('');
    console.log('  For more detailed information please check the GitHub page: ' + (0, _log.neonGreen)('https://github.com/ilbonzo/zenhub-retrospective'));
    console.log('  Or enter ' + (0, _log.neonGreen)('zenhub-retrospective milestones -h') + ', ' + (0, _log.neonGreen)('zenhub-retrospective issues -h') + ' to get more helpful information.');
    console.log('');
});

_commander2.default.command('ls-milestone [a]').option('-s, --state <state>', 'state of milestone to show [open|closed|all] default: all').option('-n, --number <number>', 'number of milestone to show, default: 10').on('--help', function () {
    console.log('');
    console.log('  Get list of all milestone.');
    console.log('');
    console.log('  Example:');
    console.log('           ' + (0, _log.neonGreen)('zenhub-retrospective ls-milestone') + '    => Show list of all milestone');
    console.log('');
}).action(function (name, options) {
    var state = options.state || 'all';
    var number = options.number || 10;
    (0, _command.lsMilestone)(state, number);
});

_commander2.default.command('milestone <name>').on('--help', function () {
    console.log('');
    console.log('  Get list of issue in milestone.');
    console.log('');
    console.log('  Example:');
    console.log('           ' + (0, _log.neonGreen)('zenhub-retrospective milestone 10.10.x') + '    => Show list of all issues in milestone');
    console.log('');
}).action(function (name, options) {
    var state = 'all';
    var number = 10;
    (0, _command.getMilestone)(name, state, number);
});

_commander2.default.command('*').action(function (command) {
    (0, _log.error)('Unknown command: ' + (0, _log.bold)(command));
    var commandNames = _commander2.default.commands.map(function (c) {
        return c._name;
    }).filter(function (name) {
        return name !== '*';
    });

    var closeMatch = (0, _didyoumean2.default)(command, commandNames);
    if (closeMatch) {
        (0, _log.error)('Did you mean ' + (0, _log.bold)(closeMatch) + ' ?');
    }
    process.exit(1);
});

if (!configured && process.argv[2] !== 'setup') {
    console.log('');
    console.log('  ' + (0, _log.messageRed)('Welcome') + ' to ' + (0, _chalk2.default)(_templateObject) + '!');
    console.log('');
    console.log('  Before start, you could setup program,  please enter: ' + (0, _log.neonGreen)('zenhub-retrospective setup'));
    console.log('');
}

if (process.argv.length === 2 && configured) {
    _commander2.default.help();
}

_commander2.default.parse(process.argv);