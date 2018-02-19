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

jest.mock('../config', () => ({
    'configGetValues': jest.fn( () => {
        return {
            'githubUsername': 'trentreznor',
            'githubPassword': 'closer',
            'repositoryOwner': 'nin',
            'repository': 'the-downward-spiral'
        }
    })
}));

import * as GitHubApi from "@octokit/rest";
import { getAllMilestones, getIssuesForRepo } from '../github';

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