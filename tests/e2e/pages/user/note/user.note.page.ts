import { expect, Locator, Page } from '@playwright/test';

export class NotePage {

    readonly page: Page;
    readonly form: Locator;
    readonly fullscreenButton: Locator;
    readonly exitFullscreenButton: Locator;
    readonly pipButton: Locator;
    readonly pipFallback: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('form#note');
        this.fullscreenButton = page.getByRole('button', { name: 'Tela cheia', exact: true });
        this.exitFullscreenButton = page.getByRole('button', { name: 'Sair da tela cheia', exact: true });
        this.pipButton = page.getByRole('button', { name: 'Picture-in-Picture', exact: true });
        this.pipFallback = page.getByRole('status').filter({ hasText: 'Nota aberta na janela flutuante' });
        this.cancelButton = this.form.getByRole('button', { name: 'Cancelar', exact: true });
    }

    async goto(username: string, name: string) {
        await this.page.goto(`/${username}/${name}`);
        await expect(this.form).toBeVisible();
    }

    async expectFullscreen(active: boolean) {
        await expect.poll(() =>
            this.page.evaluate(() => document.fullscreenElement?.id ?? null)
        ).toBe(active ? 'note' : null);
    }

    async exitFullscreen() {
        await this.page.evaluate(async () => {
            if (document.fullscreenElement) await document.exitFullscreen();
        })
    }

    async openPiP(): Promise<Page> {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.pipButton.click(),
        ])
        await popup.bringToFront();
        return popup;
    }

    async closePiP(popup: Page) {
        await Promise.all([
            popup.waitForEvent('close'),
            popup.evaluate(() => window.close()).catch(() => { }),
        ])
    }

}