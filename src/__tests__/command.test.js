jest.mock('inquirer', () => ({
        'prompt': jest.fn( () => Promise.resolve({
            'username': 'trent',
            'password': 'cl0s3r',
            'owner': 'nin',
            'repository': 'closer',
        }))
}));

jest.mock('../config', () => ({
    'configSave': jest.fn( (a, cb) => {
        cb();
    }),
}));

jest.mock('../github', () => ({
    'getAllMilestones': jest.fn(),
    'getIssuesForRepo': jest.fn(),
}));


import { configSave } from '../config';
import github from '../github';
import { setupProgram, lsMilestone, getMilestone } from '../command';


describe('setupProgram', () => {

    beforeEach(() => {
        global.console = {
            log: jest.fn()
        };
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('use setupProgram', (done) => {
        var cb = function (data) {
            expect(configSave).toHaveBeenCalled();
            done();
        }
        setupProgram(cb);
    });

});

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


describe('getMilestone', () => {

    beforeEach(() => {
        global.console = {
            log: jest.fn()
        };

        github.getIssuesForRepo.mockImplementation(() => {
            var p = new Promise(function(resolve, reject) {
                resolve([
                    {
                        'title': 'Closer',
                        'state': 'closed',
                    },
                    {
                        'title': 'The hand that feeds',
                        'state': 'open',
                    }
                ]);
            });
            return p;
        });

    });

    afterEach(() => {
        jest.resetModules();
    });

    it('use getMilestone with parameters', () => {
        const spy = jest.spyOn(github, 'getIssuesForRepo');

        getMilestone(10, 'open', 4);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(10, 'open', 4);

        getMilestone(11, 'all', 10);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(11, 'all', 10);

        spy.mockReset();
        spy.mockRestore();
    });

});