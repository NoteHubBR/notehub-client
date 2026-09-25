import { test as base, expect, Page } from '@playwright/test';

export async function dismissCookieConsent(page: Page): Promise<void> {
    const consentButton = page.getByRole('button', { name: 'Entendi' });
    const isVisible = await consentButton.isVisible({ timeout: 2_000 }).catch(() => false);
    if (isVisible) {
        await consentButton.click();
        await consentButton.waitFor({ state: 'hidden' }).catch(() => { });
    }
    return;
}

const test = base.extend<{}, {}>({
    page: async ({ page }, use) => {
        await page.goto('/');
        await dismissCookieConsent(page);
        await use(page);
    },
})

export { test, expect };