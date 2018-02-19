'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIssuesForRepo = exports.getAllMilestones = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAllMilestones = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, number) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        authenticate();
                        _context.next = 4;
                        return octokit.issues.getMilestones({
                            'owner': config.repositoryOwner,
                            'repo': config.repository,
                            'state': state,
                            'sort': 'due_on',
                            'direction': 'desc',
                            'page': 1,
                            'per_page': number
                        });

                    case 4:
                        result = _context.sent;
                        return _context.abrupt('return', result.data);

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', _promise2.default.reject({ 'message': _context.t0.message }));

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function getAllMilestones(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getIssuesForRepo = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(milestone, state, number) {
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        authenticate();
                        _context2.next = 4;
                        return octokit.issues.getForRepo({
                            'owner': config.repositoryOwner,
                            'repo': config.repository,
                            'assignee': config.githubUsername,
                            'milestone': milestone,
                            'state': state,
                            'sort': 'created',
                            'direction': 'desc',
                            'page': 1,
                            'per_page': number
                        });

                    case 4:
                        result = _context2.sent;
                        return _context2.abrupt('return', result.data);

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', _promise2.default.reject({ 'message': _context2.t0.message }));

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 8]]);
    }));

    return function getIssuesForRepo(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var _rest = require('@octokit/rest');

var GitHubApi = _interopRequireWildcard(_rest);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = (0, _config.configGetValues)();
var octokit = GitHubApi.default();

var authenticate = function authenticate() {
    octokit.authenticate({
        type: 'basic',
        username: config.githubUsername,
        password: config.githubPassword
    });
};

exports.getAllMilestones = getAllMilestones;
exports.getIssuesForRepo = getIssuesForRepo;