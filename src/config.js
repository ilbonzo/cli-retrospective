import * as fs from 'fs';
import * as path from 'path';

const configGetValues = () => {
    if (configExist()) {
        const config = require('../config.json');
        return config;
    }
}

const configExist = () => {
    if (fs.existsSync(path.dirname(__filename) + '/../config.json')) {
        return true;
    }
    return false;
}

const configSave = (answers, callback) => {
    var json = JSON.stringify(answers, null, '  ');
    fs.writeFile(path.dirname(__filename) + '/../config.json', json, 'utf8', callback);
}

export { configGetValues, configExist, configSave };