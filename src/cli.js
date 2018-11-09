import program from 'commander';
import didYouMean from 'didyoumean';
import chalk from 'chalk';

import { configExist } from './config';
import { error, bold, messageRed, neonGreen } from './log';
import { setupProgram, lsMilestone, getMilestone } from './command';

import pkg from '../package.json';

var configured = configExist();

program.version(
    `\ncli-retrospective version: ${neonGreen(pkg.version)}\n`,
    '-v, --version'
);
  
program
    .command('setup')
    .on('--help', () => {
        console.log('');
        console.log(
            '  Setup your cli-retrospective'
        );
        console.log('');
        console.log('  Example:');
        console.log(
            `           ${neonGreen(
                'zenhub-retrospective setup'
            )}    => insert your github credentials`
        );
        console.log('');
    })
    .action((name, options) => {
        setupProgram(() => {
            console.log(
                `  ${neonGreen('zenhub-retrospective setup done')}`
            );
        });
    });

program.on('--help', () => {
    console.log('');
    console.log('');
    console.log(
        `  ${messageRed('Welcome')} to ${chalk`{bold.hex('#0069b9') ZenHub Retrospective}`}!`
    );
    console.log('');
    console.log(
        `  Wanna setup program please enter: ${neonGreen('zenhub-retrospective setup')}`
    );
    console.log(
        `  Wanna watch list of milestones please enter: ${neonGreen('zenhub-retrospective ls-milestone')}`
    );
    console.log(
        `  Wanna check issue in milestone please enter: ${neonGreen(
        'zenhub-retrospective milestone <milestone>'
        )}`
    );
    console.log('');
    console.log(
        `  For more detailed information please check the GitHub page: ${neonGreen(
        'https://github.com/ilbonzo/zenhub-retrospective'
        )}`
    );
    console.log(
        `  Or enter ${neonGreen('zenhub-retrospective milestones -h')}, ${neonGreen(
        'zenhub-retrospective issues -h'
        )} to get more helpful information.`
    );
    console.log('');
});

program
    .command('ls-milestone [a]')
    .option('-s, --state <state>', 'state of milestone to show [open|closed|all] default: all')
    .option('-n, --number <number>', 'number of milestone to show, default: 10')
    .on('--help', () => {
        console.log('');
        console.log(
            '  Get list of all milestone.'
        );
        console.log('');
        console.log('  Example:');
        console.log(
            `           ${neonGreen(
                'zenhub-retrospective ls-milestone'
            )}    => Show list of all milestone`
        );
        console.log('');
    })
    .action((name, options) => {
        let state = options.state || 'all';
        let number = options.number || 10;
        lsMilestone(state, number);
    });

program
    .command('milestone <name>')
    .option('-n, --number <number>', 'number of issues to show, default: 20')
    .on('--help', () => {
        console.log('');
        console.log(
            '  Get list of issue in milestone.'
        );
        console.log('');
        console.log('  Example:');
        console.log(
            `           ${neonGreen(
                'zenhub-retrospective milestone 10.10.x'
            )}    => Show list of all issues in milestone`
        );
        console.log('');
    })
    .action((name, options) => {
        let state = 'all';
        let number = options.number || 20;
        getMilestone(name, state, number);
    });

program.command('*').action(command => {
    error(`Unknown command: ${bold(command)}`);
    const commandNames = program.commands
      .map(c => c._name)
      .filter(name => name !== '*');

    const closeMatch = didYouMean(command, commandNames);
    if (closeMatch) {
        error(`Did you mean ${bold(closeMatch)} ?`);
    }
    process.exit(1);
});

if (!configured && process.argv[2] !== 'setup') {
    console.log('');
    console.log(
        `  ${messageRed('Welcome')} to ${chalk`{bold.hex('#0069b9') ZenHub Retrospective}`}!`
    );
    console.log('');
    console.log(
        `  Before start, you could setup program,  please enter: ${neonGreen('zenhub-retrospective setup')}`
    );
    console.log('');
}

if (process.argv.length === 2 && configured) {
    program.help();
}

program.parse(process.argv);
