'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lsMilestone = undefined;

var _log = require('./log');

var _github = require('./github');

var lsMilestone = function lsMilestone() {
    (0, _github.getAllMilestones)().then(function (data) {
        var milestones = data.map(function (elem) {
            console.log((0, _log.bold)(elem.title));
        });
    });
};

exports.lsMilestone = lsMilestone;