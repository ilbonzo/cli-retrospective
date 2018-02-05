jest.mock('../github');

import { lsMilestone } from '../command';

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

        let github = require('../github');
        github.getAllMilestones = jest.fn(s => {
            var p = new Promise(function(resolve, reject) {
                resolve([
                    {
                        'title': 'Closer',
                        'state': 'closed',
                        'description': '',
                        'open_issues': 1,
                        'closed_issues': 30,
                    },
                    {
                        'title': 'The hand that feeds',
                        'state': 'open',
                        'description': '',
                        'open_issues': 10,
                        'closed_issues': 3,
                    }
                ]);
            });
            return p;
        });

        lsMilestone();

        expect(github.getAllMilestones.mock.calls.length).toBe(1);
    });

});