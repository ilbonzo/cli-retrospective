
import * as GitHubApi from "@octokit/rest";

const config = require('../config.json');

const octokit = GitHubApi.default();

octokit.authenticate({
    type: 'basic',
    username: config.githubUsername,
    password: config.githubPassword
})

async function getAllMilestones() {
    const result = await octokit.issues.getMilestones(
        {
            'owner': config.repositoryOwner,
            'repo': config.repository,
            'state': 'all',
            'sort': 'due_on',
            'direction': 'desc',
            'page': 1,
            'per_page': 30
        }
    );

    return result.data;
}

export { getAllMilestones };