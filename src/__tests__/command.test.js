jest.mock('../github', () => ({
    getAllMilestones: jest.fn()
}));

import github from '../github'
import { lsMilestone } from '../command';

describe('lsMilestone', () => {

    beforeEach(() => {
        global.console = {
            log: jest.fn()
        };

        github.getAllMilestones.mockImplementation(() => {
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

    });

    afterEach(() => {
        jest.resetModules();
    });

    it('use lsMilestone with parameters', () => {
        const spy = jest.spyOn(github, 'getAllMilestones');

        lsMilestone('open', 4);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('open', 4);

        lsMilestone('all', 10);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('all', 10);

        spy.mockReset();
        spy.mockRestore();
    });

});