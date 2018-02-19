'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configSave = exports.configExist = exports.configGetValues = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configGetValues = function configGetValues() {
    if (configExist()) {
        var config = require('../config.json');
        return config;
    }
};

var configExist = function configExist() {
    if (fs.existsSync(path.dirname(__filename) + '/../config.json')) {
        return true;
    }
    return false;
};

var configSave = function configSave(answers, callback) {
    var json = (0, _stringify2.default)(answers, null, '  ');
    fs.writeFile(path.dirname(__filename) + '/../config.json', json, 'utf8', callback);
};

exports.configGetValues = configGetValues;
exports.configExist = configExist;
exports.configSave = configSave;