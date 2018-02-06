
import * as GitHubApi from "@octokit/rest";

const config = require('../config.json');

const octokit = GitHubApi.default();

octokit.authenticate({
    type: 'basic',
    username: config.githubUsername,
    password: config.githubPassword
})

async function getAllMilestones(state, number) {
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
}

export { getAllMilestones };