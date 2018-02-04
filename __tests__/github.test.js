import * as GitHubApi from "@octokit/rest";
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

        let octokit = GitHubApi.default();
        const data = getAllMilestones().then((data) => {
            expect(data.length).toBe(2);
            expect(data[0].title).toBe('Closer');
            expect(data[1].title).toBe('The hand that feeds');
        });
    });

});