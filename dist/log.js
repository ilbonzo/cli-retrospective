'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.neonGreen = exports.messageRed = exports.bold = exports.error = undefined;

var _templateObject = _taggedTemplateLiteral(['{red.bold ', '}'], ['{red.bold ', '}']),
    _templateObject2 = _taggedTemplateLiteral(['{white.bold ', '}'], ['{white.bold ', '}']),
    _templateObject3 = _taggedTemplateLiteral(['{bold.hex(\'#f00b47\') ', '}'], ['{bold.hex(\'#f00b47\') ', '}']),
    _templateObject4 = _taggedTemplateLiteral(['{hex(\'#66ff66\') ', '}'], ['{hex(\'#66ff66\') ', '}']);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var error = function error(msg) {
  console.log((0, _chalk2.default)(_templateObject, msg));
};

var bold = function bold(msg) {
  return (0, _chalk2.default)(_templateObject2, msg);
};

var messageRed = function messageRed(msg) {
  return (0, _chalk2.default)(_templateObject3, msg);
};

var neonGreen = function neonGreen(msg) {
  return (0, _chalk2.default)(_templateObject4, msg);
};

exports.error = error;
exports.bold = bold;
exports.messageRed = messageRed;
exports.neonGreen = neonGreen;