import { expect, test } from '@e2e/fixtures/auth';
import { NewNotePage, NotePage } from '@e2e/pages';
import { randomUUID } from 'crypto';
import { seedUsers } from '@e2e/fixtures/seeds';

const { username } = seedUsers.usera;
const title = () => `e2e-${randomUUID()}`;
const passphrase = 'creation-test-secret';

test.describe('New note page', () => {

    test.describe.configure({ mode: 'serial' });

    let newNotePage: NewNotePage;
    let notePage: NotePage;
    let createdNote: { name: string; encrypted: boolean; passphrase?: string } | null;

    test.beforeEach(async ({ authenticatedPage: page }) => {
        createdNote = null;
        newNotePage = new NewNotePage(page);
        notePage = new NotePage(page);
        await newNotePage.goto();
    })

    test.afterEach(async ({ authenticatedPage: page }) => {
        if (!createdNote) return;
        const note = createdNote;
        if (await notePage.markdownEditor.isVisible().catch(() => false)) {
            await page.keyboard.press('Control+q');
        }
        await page.goto(`/${username}/${note.name}`);
        if (!(await notePage.form.isVisible().catch(() => false))) {
            createdNote = null;
            return;
        }
        if (note.encrypted) {
            await notePage.openDecryptionDialog();
            await notePage.submitPassphrase(note.passphrase!);
            await expect(notePage.passphraseDialog).toBeHidden();
        }
        await notePage.deleteAndConfirm(username);
        createdNote = null;
        await expect(page).toHaveURL(new RegExp(`/${username}/notes$`));
    })

    test('should show a validation error for an invalid title', async () => {
        await newNotePage.fill('---');
        await newNotePage.submit();
        await newNotePage.expectFieldError('name', 'Apenas letras, números, _ e .');
    })

    test('should create a note with default public, open and unencrypted settings', async ({ authenticatedPage: page }) => {
        const name = title();
        createdNote = { name, encrypted: false };
        await newNotePage.fill(name);
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);

        await notePage.openConfiguration();
        await notePage.expectClosedSetting(false);
        await notePage.expectEncryptionSetting(false);
        await notePage.expectHiddenSetting(false);
        await notePage.closeConfiguration();
        await expect(page).toHaveURL(new RegExp(`/${username}/${name}$`));

        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

    test('should create a note with a description', async () => {
        const name = title();
        const description = `Description ${name}`;
        createdNote = { name, encrypted: false };
        await newNotePage.fill(name, { description });
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);
        await expect(notePage.page.getByText(description, { exact: true })).toBeVisible();
        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

    test('should create a public note with comments closed', async () => {
        const name = title();
        createdNote = { name, encrypted: false };
        await newNotePage.fill(name, { commentsClosed: true });
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);
        await expect(notePage.commentClosedMessage).toBeVisible();
        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

    test('should require a secret when encryption is enabled', async () => {
        await newNotePage.fill(title(), { encrypted: true });
        await newNotePage.submit();
        await newNotePage.expectFieldError('passphrase', 'Informe o segredo.');
    })

    test('should allow the author to delete an encrypted note while it is locked', async () => {
        const name = title();
        createdNote = { name, encrypted: true, passphrase };
        await newNotePage.fill(name, { encrypted: true, passphrase });
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);

        await expect(notePage.decryptButton).toBeVisible();
        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

    test('should create, protect, decrypt, edit and delete an encrypted note', async ({ authenticatedPage: page }) => {
        const name = title();
        const plaintext = `Secret text ${name}`;
        createdNote = { name, encrypted: true, passphrase };
        await newNotePage.fill(name, { encrypted: true, passphrase });
        await newNotePage.uploadMarkdown(plaintext);
        const createRequest = page.waitForRequest((request) =>
            request.method() === 'POST' && request.url().includes('/notes/new-note')
        );
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);
        const payload = (await createRequest).postDataJSON() as { markdown: string };
        expect(payload.markdown).toMatch(/^-----BEGIN AGE ENCRYPTED FILE-----/);
        expect(payload.markdown).not.toContain(plaintext);
        await expect(notePage.preview).not.toContainText(plaintext);

        await notePage.page.keyboard.press('Control+e');
        await expect(notePage.passphraseDialog).toBeVisible();
        await notePage.page.keyboard.press('Escape');
        await expect(notePage.passphraseDialog).toBeHidden();

        await notePage.settingsButton.click();
        await expect(notePage.passphraseDialog).toBeVisible();
        await notePage.page.keyboard.press('Escape');
        await expect(notePage.passphraseDialog).toBeHidden();

        await notePage.openDecryptionDialog();
        await notePage.submitPassphrase(`wrong-${passphrase}`);
        await expect(notePage.passphraseError).toHaveText('Segredo incorreto.');
        await notePage.submitPassphrase(passphrase);
        await expect(notePage.passphraseDialog).toBeHidden();
        await expect(notePage.preview).toContainText(plaintext);

        await notePage.startEditing();
        const updatedText = `${plaintext} edited`;
        await notePage.fillMarkdown(updatedText);
        const updateRequest = await notePage.saveMarkdownWithShortcut();
        const updatePayload = updateRequest.postDataJSON() as { markdown: string };
        expect(updatePayload.markdown).toMatch(/^-----BEGIN AGE ENCRYPTED FILE-----/);
        expect(updatePayload.markdown).not.toContain(updatedText);
        await expect(notePage.preview).toContainText(updatedText);

        await notePage.openConfiguration();
        const updatedDescription = `Updated ${name}`;
        await notePage.setDescription(updatedDescription);
        await notePage.saveConfiguration();
        await expect(notePage.page.getByText(updatedDescription, { exact: true })).toBeVisible();

        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

    test('should create a hidden note and show it as hidden in its settings', async () => {
        const name = title();
        createdNote = { name, encrypted: false };
        await newNotePage.fill(name, { hidden: true });
        await newNotePage.submit();
        await newNotePage.expectCreated(username, name);
        await notePage.openConfiguration();
        await notePage.expectHiddenSetting(true);
        await notePage.closeConfiguration();
        await notePage.deleteAndConfirm(username);
        createdNote = null;
    })

})
