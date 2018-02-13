'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMilestone = exports.lsMilestone = undefined;

var _log = require('./log');

var _table = require('./table');

var _github = require('./github');

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

exports.lsMilestone = lsMilestone;
exports.getMilestone = getMilestone;