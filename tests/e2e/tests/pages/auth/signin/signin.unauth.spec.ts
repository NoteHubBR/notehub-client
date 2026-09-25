import { LoginPage } from '../../../../pages';
import { test } from '../../../../fixtures/base.fixture';
import type { LoginFormData } from '@/core';

const userA = (overrides?: Partial<LoginFormData>): LoginFormData => ({
    identifier: 'usera',
    password: 'usera',
    ...overrides,
})

test.describe('User Login', () => {

    test('should display error when identifier does not exist', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const data = userA({ identifier: 'error' });

        await loginPage.goto();
        await loginPage.fill(data);
        await loginPage.submit();

        await loginPage.expectError('identifier', 'Identificador não existe.');
    })

    test('should display error when password does not match', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const data = userA({ password: 'error' });

        await loginPage.goto();
        await loginPage.fill(data);
        await loginPage.submit();

        await loginPage.expectError('password', 'Senha incorreta.');
    })

})