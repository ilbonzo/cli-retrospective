'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllMilestones = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAllMilestones = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return octokit.issues.getMilestones({
                            'owner': config.repositoryOwner,
                            'repo': config.repository,
                            'state': 'all',
                            'sort': 'due_on',
                            'direction': 'desc',
                            'page': 1,
                            'per_page': 30
                        });

                    case 2:
                        result = _context.sent;
                        return _context.abrupt('return', result.data);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getAllMilestones() {
        return _ref.apply(this, arguments);
    };
}();

var _rest = require('@octokit/rest');

var GitHubApi = _interopRequireWildcard(_rest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config.json');

var octokit = GitHubApi.default();

octokit.authenticate({
    type: 'basic',
    username: config.githubUsername,
    password: config.githubPassword
});

exports.getAllMilestones = getAllMilestones;