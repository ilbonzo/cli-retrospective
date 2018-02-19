jest.mock('fs', () => ({
    'existsSync': jest.fn( () => {
        return true;
    })
    .mockImplementationOnce(() => {
        return false;
    })
    .mockImplementationOnce(() => {
        return true;
    })
    .mockImplementationOnce(() => {
        return false;
    })
    .mockImplementationOnce(() => {
        return true;
    }),
    'writeFile': jest.fn(),
}));

jest.mock('../../config.json', () => ({
        'githubUsername': 'trentreznor',
        'githubPassword': 'closer',
        'repositoryOwner': 'nin',
        'repository': 'the-downward-spiral'
    }),
    {
        virtual: true
    }
);

import { configGetValues, configExist, configSave } from '../config';

describe('use config', () => {

    it('check configExists fail', () => {
        expect(configExist()).toBe(false);
    });

    it('check configExists success', () => {
        expect(configExist()).toBe(true);
    });
    it('check config values without config', () => {
        const config = configGetValues();
    });

    it('check config values', () => {
        const config = configGetValues();
        expect(config.githubUsername).toBe('trentreznor');
        expect(config.githubPassword).toBe('closer');
        expect(config.repositoryOwner).toBe('nin');
        expect(config.repository).toBe('the-downward-spiral');
    });

    it('check configSave', () => {
        const values = {
            'githubUsername': 'trentreznor',
            'githubPassword': 'closer',
            'repository': 'nin',
            'repositoryOwner': 'the-downward-spiral',
        };

        configSave(values);
    });


});
