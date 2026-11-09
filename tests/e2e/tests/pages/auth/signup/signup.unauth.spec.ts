import { expect, test } from '@e2e/fixtures/auth';
import { RegisterPage } from '@e2e/pages';
import { seedUsers } from '@e2e/fixtures/seeds';
import type { CreateUserFormData } from '@/core';

const userX = (overrides?: Partial<CreateUserFormData>): CreateUserFormData => ({
    email: 'userx@notehub.com.br',
    username: 'userx',
    displayName: 'User X',
    password: 'userx',
    repeatPassword: 'userx',
    ...overrides,
})

test.describe('User Signup', () => {

    test('should return error when username already exists', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const data = userX({ username: seedUsers.usera.username });

        await registerPage.goto();
        await registerPage.fill(data);
        await registerPage.submit();

        await registerPage.expectError('username', 'Nome já existe.');
    })

    test('should display zod error for username with invalid character', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const data = userX({ username: 'user*a' });

        await registerPage.goto();
        await registerPage.fill(data);
        await registerPage.submit();

        await registerPage.expectError('username', 'Use letras, números e _ . - como separadores.');
    })

    test('should display zod error when passwords do not match', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const data = userX({ username: 'user*a', repeatPassword: 'userxyz' });

        await registerPage.goto();
        await registerPage.fill(data);
        await registerPage.submit();

        await registerPage.expectError('username', 'Use letras, números e _ . - como separadores.');
        await registerPage.expectError('repeatPassword', 'Senhas diferentes.');
    })

    test('should register successfully and redirect to /sent', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const data = userX();

        await registerPage.goto();
        await registerPage.fill(data);
        await registerPage.submit();

        await expect(page).toHaveURL('/sent')
    })

})