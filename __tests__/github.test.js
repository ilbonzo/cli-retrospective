import { getAllMilestones } from '../src/github';

jest.mock('../config.json', () => ({
        'githubUsername': 'trentreznor',
        'githubPassword': 'closer',
        'repositoryOwner': 'nin',
        'repository': 'the-downward-spiral'
    }),
    {
        virtual: true
    }
);


describe('getAllMilestones', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('use getAllMilestones', () => {
        const data = getAllMilestones().then((data) => {
            var milestones = data.map(function(elem) {
                console.log(elem.title);
            });
        });

    });

});