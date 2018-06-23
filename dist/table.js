'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicTable = undefined;

var _cliTable = require('cli-table3');

var _cliTable3 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basicTable = function basicTable() {
    return new _cliTable3.default({
        head: [],
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        }
    });
};

module.exports = {
    basicTable: basicTable
};

exports.basicTable = basicTable;