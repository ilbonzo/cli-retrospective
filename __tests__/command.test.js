jest.mock('../src/github');

import { lsMilestone } from '../src//command';

describe('lsMilestone', () => {

    beforeEach(() => {
        global.console = {
            log: jest.fn()
        };
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('use lsMilestone', () => {

        let github = require('../src/github');
        github.getAllMilestones = jest.fn(s => {
            var p = new Promise(function(resolve, reject) {
                resolve([
                    {'title': 'Closer'},
                    {'title': 'The hand that feeds'}
                ]);
            });
            return p;
        });

        lsMilestone();

        expect(github.getAllMilestones.mock.calls.length).toBe(1);
    });

});