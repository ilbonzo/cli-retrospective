import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';

import { configSave } from './config';
import { error, bold, messageRed, neonGreen } from './log';
import { basicTable } from './table';
import { getAllMilestones, getIssuesForRepo } from './github';

const setupProgram = (callback) => {

    inquirer
        .prompt([
        {
            type: 'input',
            message: 'Enter a github username:',
            name: 'githubUsername'
        },
        {
            type: 'password',
            message: 'Enter a github password:',
            name: 'githubPassword',
            mask: '*'
        },
        {
            type: 'input',
            message: 'Enter a github repository:',
            name: 'repository'
        },
        {
            type: 'input',
            message: 'Enter a github repository owner:',
            name: 'repositoryOwner',
        }
        ])
        .then((answers) => {
            configSave(answers, callback);
        });

}

const lsMilestone = (state, number) => {

    const milestoneTable = basicTable();

    milestoneTable.push(
        [
            {
                colSpan: 5,
                content: bold('MILESTONES'),
                hAlign: 'left',
                vAlign: 'center',
            },
        ],
        [
            bold('NUMBER'),
            bold('TITLE'),
            bold('STATE'),
            bold('DESCRIPTION'),
            bold('OPEN ISSUES'),
            bold('CLOSED ISSUES'),
        ]
    );

    getAllMilestones(state, number).then((data) => {
        var milestones = data.map(function(elem) {
            milestoneTable.push(
                [
                    elem.number,
                    bold(elem.title),
                    elem.state,
                    elem.description,
                    messageRed(elem.open_issues),
                    neonGreen( elem.closed_issues),
                ]
            );
        });
        console.log(milestoneTable.toString());
    });

}

const getMilestone = (milestone, state, number) => {

    const milestoneTable = basicTable();

    milestoneTable.push(
        [
            {
                colSpan: 2,
                content: bold('MILESTONE'),
                hAlign: 'left',
                vAlign: 'center',
            },
        ],
        [
            bold('TITLE'),
            bold('STATE')
        ]
    );

    getIssuesForRepo(milestone, state, number).then((data) => {
        var milestones = data.map(function(elem) {
            milestoneTable.push(
                [
                    bold(elem.title),
                    elem.state
                ]
            );
        });
        console.log(milestoneTable.toString());
    });

}

export { setupProgram, lsMilestone, getMilestone };