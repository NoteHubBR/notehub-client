import { expect, Locator, Page } from '@playwright/test';
import type { Request } from '@playwright/test';

export class NotePage {

    readonly page: Page;
    readonly form: Locator;
    readonly fullscreenButton: Locator;
    readonly exitFullscreenButton: Locator;
    readonly pipButton: Locator;
    readonly pipFallback: Locator;
    readonly cancelButton: Locator;
    readonly preview: Locator;
    readonly decryptButton: Locator;
    readonly passphraseDialog: Locator;
    readonly passphraseInput: Locator;
    readonly passphraseError: Locator;
    readonly markdownEditor: Locator;
    readonly settingsButton: Locator;
    readonly configurationForm: Locator;
    readonly commentBox: Locator;
    readonly commentClosedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('form#note');
        this.fullscreenButton = page.getByRole('button', { name: 'Tela cheia', exact: true });
        this.exitFullscreenButton = page.getByRole('button', { name: 'Sair da tela cheia', exact: true });
        this.pipButton = page.getByRole('button', { name: 'Picture-in-Picture', exact: true });
        this.pipFallback = page.getByRole('status').filter({ hasText: 'Nota aberta na janela flutuante' });
        this.cancelButton = this.form.getByRole('button', { name: 'Cancelar', exact: true });
        this.preview = page.locator('article.prose');
        this.decryptButton = this.form.getByRole('button', { name: 'Descriptografar', exact: true });
        this.passphraseDialog = page.getByRole('dialog');
        this.passphraseInput = this.passphraseDialog.locator('#passphrase');
        this.passphraseError = page.getByTestId('error-passphrase');
        this.markdownEditor = page.locator('.cm-content');
        this.settingsButton = page.locator('aside header button');
        this.configurationForm = page.locator('form').filter({ has: page.locator('#hidden') });
        this.commentBox = page.locator('#comment-wrapper');
        this.commentClosedMessage = this.commentBox.getByText('A nota está fechada para novas interações.');
    }

    async goto(username: string, name: string) {
        await this.page.goto(`/${username}/${name}`);
        await expect(this.form).toBeVisible();
    }

    async openDecryptionDialog() {
        await this.decryptButton.click();
    }

    async submitPassphrase(passphrase: string) {
        await this.passphraseInput.fill(passphrase);
        await this.passphraseDialog.getByRole('button', { name: 'Concluir', exact: true }).click();
    }

    async decryptWithPassphrase(passphrase: string, plaintext: string) {
        await this.submitPassphrase(passphrase);
        await expect(this.passphraseDialog).toBeHidden();
        await expect(this.preview).toContainText(plaintext);
    }

    async startEditing() {
        await this.page.keyboard.press('Control+e');
        await expect(this.markdownEditor).toBeVisible();
    }

    async fillMarkdown(markdown: string) {
        await this.markdownEditor.fill(markdown);
    }

    async openConfiguration() {
        await this.settingsButton.click();
        await expect(this.configurationForm).toBeVisible();
    }

    async setDescription(description: string) {
        await this.configurationForm.locator('#description').fill(description);
    }

    async expectHiddenSetting(hidden: boolean) {
        await expect(this.configurationForm.locator('#hidden')).toBeChecked({ checked: hidden });
    }

    async expectEncryptionSetting(encrypted: boolean) {
        await expect(this.configurationForm.locator('#encrypted')).toBeChecked({ checked: encrypted });
    }

    async expectClosedSetting(closed: boolean) {
        await expect(this.configurationForm.locator('#closed')).toBeChecked({ checked: closed });
    }

    async closeConfiguration() {
        await this.configurationForm.getByRole('button', { name: 'Cancelar', exact: true }).click();
        await expect(this.configurationForm).toBeHidden();
    }

    async saveConfiguration() {
        await this.configurationForm.getByRole('button', { name: 'Salvar alteração', exact: true }).click();
        await expect(this.configurationForm).toBeHidden();
    }

    async openDeleteConfirmation() {
        await this.form.getByRole('button', { name: 'Menu', exact: true }).click();
        await this.page.getByRole('menuitem', { name: 'Apagar', exact: true }).click();
        return this.page.getByRole('dialog').filter({ hasText: 'Tem certeza de que deseja apagar esta nota?' });
    }

    async deleteAndConfirm(username: string) {
        const dialog = await this.openDeleteConfirmation();
        await expect(dialog).toBeVisible();
        await dialog.getByRole('button', { name: 'Sim, apagar', exact: true }).click();
        await expect(this.page).toHaveURL(new RegExp(`/${username}/notes$`));
    }

    async saveMarkdownWithShortcut(): Promise<Request> {
        const request = this.page.waitForRequest((request) =>
            request.method() === 'PATCH' && request.url().includes('/change-markdown')
        );
        await this.page.keyboard.press('Control+s');
        return request;
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