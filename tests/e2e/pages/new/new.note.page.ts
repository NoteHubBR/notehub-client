import { Buffer } from 'buffer';
import { expect, Locator, Page } from '@playwright/test';

export interface NewNoteOptions {
    description?: string;
    commentsClosed?: boolean;
    encrypted?: boolean;
    hidden?: boolean;
    passphrase?: string;
}

export class NewNotePage {

    readonly page: Page;
    readonly form: Locator;
    readonly title: Locator;
    readonly description: Locator;
    readonly passphrase: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('form').filter({ has: page.locator('#name') });
        this.title = this.form.locator('#name');
        this.description = this.form.locator('#description');
        this.passphrase = this.form.locator('#passphrase');
        this.createButton = this.form.getByRole('button', { name: 'Criar nota', exact: true });
    }

    async goto() {
        await this.page.goto('/new');
        await expect(this.form).toBeVisible();
    }

    async fill(title: string, options: NewNoteOptions = {}) {
        await this.title.fill(title);
        if (options.description) await this.description.fill(options.description);
        if (options.commentsClosed) await this.form.locator('#closedTrue').check();
        if (options.hidden) await this.form.locator('#hiddenTrue').check();
        if (options.encrypted) {
            await this.form.locator('#encryptedTrue').check();
            if (options.passphrase) await this.passphrase.fill(options.passphrase);
        }
    }

    async uploadMarkdown(markdown: string) {
        await this.form.locator('#markdown').setInputFiles({
            name: 'note.md',
            mimeType: 'text/markdown',
            buffer: Buffer.from(markdown),
        });
    }

    async submit() {
        await this.createButton.scrollIntoViewIfNeeded();
        await this.createButton.click();
    }

    async expectCreated(username: string, title: string) {
        await expect(this.page).toHaveURL(new RegExp(`/${username}/${title}$`));
    }

    async expectFieldError(field: string, message: string | RegExp) {
        await expect(this.page.getByTestId(`error-${field}`)).toHaveText(message);
    }

}