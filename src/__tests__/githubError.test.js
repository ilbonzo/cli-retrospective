jest.mock('@octokit/rest', () => jest.fn(
    () => {
        const api = {
            'authenticate': jest.fn(),
            'issues': {
                'getMilestones': jest.fn( () => Promise.reject({ 'message': 'ERROR'})),
                'getForRepo': jest.fn( () => Promise.reject({ 'message': 'ERROR'}))
            }
        }
        return api
    }
));

import * as GitHubApi from "@octokit/rest";
import { getAllMilestones, getIssuesForRepo } from '../github';

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

describe('getAllMilestones error', () => {

    afterEach(() => {
        jest.resetModules();
    });

    it('use getAllMilestones error', () => {
        const data = getAllMilestones('all', 2).then().catch((error) => {
            expect(error.message).toBe('ERROR');
        });
    });

});

describe('getIssuesForRepo error', () => {

    afterEach(() => {
        jest.resetModules();
    });

    it('use getIssuesForRepo error', () => {
        const data = getIssuesForRepo('Closer', 'all', 5).then().catch((error) => {
            expect(error.message).toBe('ERROR');
        });
    });

});