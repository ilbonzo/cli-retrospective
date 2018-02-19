jest.mock('@octokit/rest', () => jest.fn(
    () => {
        const api = {
            'authenticate': jest.fn(),
            'issues': {
                'getMilestones': jest.fn( () => {
                    return {
                        'data': [
                            {'title': 'Closer'},
                            {'title': 'The hand that feeds'}
                        ]
                    }
                }),
                'getForRepo': jest.fn( () => {
                    return {
                        'data': [
                            {'title': 'Hurt'},
                            {'title': 'Everyday is exactly the same'}
                        ]
                    }
                })
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

describe('getAllMilestones', () => {

    afterEach(() => {
        jest.resetModules();
    });

    it('use getAllMilestones', () => {
        const data = getAllMilestones('all', 2).then((data) => {
            expect(data.length).toBe(2);
            expect(data[0].title).toBe('Closer');
            expect(data[1].title).toBe('The hand that feeds');
        });
    });

});

describe('getIssuesForRepo', () => {

    afterEach(() => {
        jest.resetModules();
    });

    it('use getIssuesForRepo', () => {

        let octokit = GitHubApi.default();
        const data = getIssuesForRepo('Closer', 'all', 5).then((data) => {
            expect(data.length).toBe(2);
            expect(data[0].title).toBe('Hurt');
            expect(data[1].title).toBe('Everyday is exactly the same');
        });
    });

});