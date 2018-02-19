
import * as GitHubApi from "@octokit/rest";
import { configGetValues } from './config';

const config = configGetValues();
const octokit = GitHubApi.default();

const authenticate = () => {
    octokit.authenticate({
        type: 'basic',
        username: config.githubUsername,
        password: config.githubPassword
    });
}

async function getAllMilestones(state, number) {
    try {
        authenticate();
        const result = await octokit.issues.getMilestones(
            {
                'owner': config.repositoryOwner,
                'repo': config.repository,
                'state': state,
                'sort': 'due_on',
                'direction': 'desc',
                'page': 1,
                'per_page': number
            }
        );

        return result.data;
    } catch (error) {
        return Promise.reject({ 'message': error.message});
    }
}

async function getIssuesForRepo(milestone, state, number) {
    try {
        authenticate();
        const result = await octokit.issues.getForRepo(
            {
                'owner': config.repositoryOwner,
                'repo': config.repository,
                'assignee': config.githubUsername,
                'milestone': milestone,
                'state': state,
                'sort': 'created',
                'direction': 'desc',
                'page': 1,
                'per_page': number
            }
        );
        return result.data;
    } catch (error) {
        return Promise.reject({ 'message': error.message});
    }
}

export { getAllMilestones, getIssuesForRepo };