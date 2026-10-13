import { Browser, Page } from '@playwright/test';
import { LoginPage } from '../../pages/auth/signin/signin.page';
import { test as base, dismissCookieConsent } from '../base.fixture';

type AuthFixtures = { authenticatedPage: Page };
type IsolatedFixtures = { isolatedAuthPage: Page };

export { expect } from '@playwright/test';

async function login(browser: Browser, username: string, password: string) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await dismissCookieConsent(page);
    await loginPage.fill({ identifier: username, password });
    await loginPage.submit();
    await page.waitForURL('/');
    await dismissCookieConsent(page);
    return { context, page };
}

export const test = base.extend<IsolatedFixtures, AuthFixtures>({
    authenticatedPage: [
        async ({ browser }, use) => {
            const { context, page } = await login(browser, 'usera', 'usera');
            await use(page);
            await context.close();
        },
        {
            scope: 'worker'
        },
    ],
    isolatedAuthPage: async ({ browser }, use) => {
        const { context, page } = await login(browser, 'usera', 'usera');
        await use(page);
        await context.close();
    },
})