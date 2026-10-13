import { expect, test } from '@e2e/fixtures/auth';
import { NotePage } from '@e2e/pages';
import { seedNotes, seedUsers } from '@e2e/fixtures/seeds';

const { username } = seedUsers.usera;
const { name } = seedNotes.notea;

test.describe('Note page - fullscreen', () => {

    let notePage: NotePage;

    test.beforeEach(async ({ authenticatedPage }) => {
        notePage = new NotePage(authenticatedPage);
        await notePage.goto(username, name);
    })

    test.afterEach(async () => {
        await notePage.exitFullscreen();
    })

    test('should enter and exit fullscreen through the button', async () => {
        await notePage.fullscreenButton.click();
        await notePage.expectFullscreen(true);
        await expect(notePage.exitFullscreenButton).toBeVisible();
        await notePage.exitFullscreenButton.click();
        await notePage.expectFullscreen(false);
        await expect(notePage.fullscreenButton).toBeVisible();
    })

    test('should toggle fullscreen with the Alt+Z shortcut', async () => {
        await notePage.page.keyboard.press('Alt+z');
        await notePage.expectFullscreen(true);
        await notePage.page.keyboard.press('Alt+z');
        await notePage.expectFullscreen(false);
    })

    test('should reset the button when fullscreen ends outside the app', async () => {
        await notePage.fullscreenButton.click();
        await expect(notePage.exitFullscreenButton).toBeVisible();
        await notePage.exitFullscreen();
        await expect(notePage.fullscreenButton).toBeVisible();
        await expect(notePage.exitFullscreenButton).toBeHidden();
    })

})