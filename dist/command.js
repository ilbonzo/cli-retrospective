'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMilestone = exports.lsMilestone = exports.setupProgram = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _config = require('./config');

var _log = require('./log');

var _table = require('./table');

var _github = require('./github');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setupProgram = function setupProgram(callback) {

    _inquirer2.default.prompt([{
        type: 'input',
        message: 'Enter a github username:',
        name: 'githubUsername'
    }, {
        type: 'password',
        message: 'Enter a github password:',
        name: 'githubPassword',
        mask: '*'
    }, {
        type: 'input',
        message: 'Enter a github repository:',
        name: 'repository'
    }, {
        type: 'input',
        message: 'Enter a github repository owner:',
        name: 'repositoryOwner'
    }]).then(function (answers) {
        (0, _config.configSave)(answers, callback);
    });
};

var lsMilestone = function lsMilestone(state, number) {

    var milestoneTable = (0, _table.basicTable)();

    milestoneTable.push([{
        colSpan: 5,
        content: (0, _log.bold)('MILESTONES'),
        hAlign: 'left',
        vAlign: 'center'
    }], [(0, _log.bold)('NUMBER'), (0, _log.bold)('TITLE'), (0, _log.bold)('STATE'), (0, _log.bold)('DESCRIPTION'), (0, _log.bold)('OPEN ISSUES'), (0, _log.bold)('CLOSED ISSUES')]);

    (0, _github.getAllMilestones)(state, number).then(function (data) {
        var milestones = data.map(function (elem) {
            milestoneTable.push([elem.number, (0, _log.bold)(elem.title), elem.state, elem.description, (0, _log.messageRed)(elem.open_issues), (0, _log.neonGreen)(elem.closed_issues)]);
        });
        console.log(milestoneTable.toString());
    });
};

var getMilestone = function getMilestone(milestone, state, number) {

    var milestoneTable = (0, _table.basicTable)();

    milestoneTable.push([{
        colSpan: 2,
        content: (0, _log.bold)('MILESTONE'),
        hAlign: 'left',
        vAlign: 'center'
    }], [(0, _log.bold)('TITLE'), (0, _log.bold)('STATE')]);

    (0, _github.getIssuesForRepo)(milestone, state, number).then(function (data) {
        var milestones = data.map(function (elem) {
            milestoneTable.push([(0, _log.bold)(elem.title), elem.state]);
        });
        console.log(milestoneTable.toString());
    });
};

exports.setupProgram = setupProgram;
exports.lsMilestone = lsMilestone;
exports.getMilestone = getMilestone;