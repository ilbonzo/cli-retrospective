'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.neonGreen = exports.messageRed = exports.bold = exports.error = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['{red.bold ', '}'], ['{red.bold ', '}']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['{white.bold ', '}'], ['{white.bold ', '}']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['{bold.hex(\'#f00b47\') ', '}'], ['{bold.hex(\'#f00b47\') ', '}']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['{hex(\'#66ff66\') ', '}'], ['{hex(\'#66ff66\') ', '}']);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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