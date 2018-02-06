import program from 'commander';
import didYouMean from 'didyoumean';
import chalk from 'chalk';

import { error, bold, messageRed, neonGreen } from './log';
import { lsMilestone } from './command';

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
    .action((name, option) => {
        console.log(name);
    });

program.on('--help', () => {
    console.log('');
    console.log('');
    console.log(
        `  ${messageRed('Welcome')} to ${chalk`{bold.hex('#0069b9') ZenHub Retrospective}`}!`
    );
    console.log('');
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


if (process.argv.length === 2) {
    program.help();
}

program.parse(process.argv);
