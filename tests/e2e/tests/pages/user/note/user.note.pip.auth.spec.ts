import { dismissCookieConsent } from '@e2e/fixtures/base.fixture';
import { expect, test } from '@e2e/fixtures/auth';
import { NotePage } from '@e2e/pages';
import { seedNotes, seedUsers } from '@e2e/fixtures/seeds';
import type { Page } from '@playwright/test';

const { username } = seedUsers.usera;
const { name } = seedNotes.notea;

const stubDocumentPictureInPicture = () => {
    Object.defineProperty(window, 'documentPictureInPicture', {
        configurable: true,
        value: {
            requestWindow: async ({ width, height }: { width: number; height: number }) => {
                const win = window.open('', '_blank', `popup,width=${width},height=${height}`);
                if (!win) throw new Error('Popup blocked');
                return win;
            },
        },
    })
}

test.describe('Note page - Picture-in-Picture', () => {

    let page: Page;
    let notePage: NotePage;
    let popup: Page | undefined;

    test.beforeEach(async ({ authenticatedPage }) => {
        popup = undefined;
        page = await authenticatedPage.context().newPage();
        await page.addInitScript(stubDocumentPictureInPicture);
        notePage = new NotePage(page);
        await notePage.goto(username, name);
        await dismissCookieConsent(page);
    })

    test.afterEach(async () => {
        if (popup && !popup.isClosed()) await popup.close();
        await page.close();
    })

    test('should move the note to the floating window and bring it back on close', async () => {
        popup = await notePage.openPiP();
        const pipNote = new NotePage(popup);
        await expect(pipNote.form).toBeVisible();
        await expect(notePage.pipFallback).toBeVisible();
        await expect(notePage.form).toHaveCount(0);
        await notePage.closePiP(popup);
        await expect(notePage.pipFallback).toBeHidden();
        await expect(notePage.form).toBeVisible();
    })

    test('should keep keyboard shortcuts working inside the floating window', async () => {
        popup = await notePage.openPiP();
        const pipNote = new NotePage(popup);
        await expect(pipNote.form).toBeVisible();
        await expect(pipNote.cancelButton).toBeHidden();
        await popup.keyboard.press('Control+e');
        await expect(pipNote.cancelButton).toBeVisible();
        await popup.keyboard.press('Control+q');
        await expect(pipNote.cancelButton).toBeHidden();
    })

})