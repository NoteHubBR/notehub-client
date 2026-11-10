import { expect, test } from '@e2e/fixtures/auth';
import { NotePage } from '@e2e/pages';
import { seedNotes, seedUsers } from '@e2e/fixtures/seeds';

test.describe('Encrypted note page', () => {

    test.describe.configure({ mode: 'serial' });

    let notePage: NotePage;

    test.beforeAll(async ({ authenticatedPage: page }) => {
        notePage = new NotePage(page);
    })

    test.beforeEach(async () => {
        await notePage.goto(seedUsers.usera.username, seedNotes.encrypted.name);
    })

    test('should keep encrypted content hidden while locked', async () => {
        await expect(notePage.decryptButton).toBeVisible();
        await expect(notePage.preview).not.toContainText(seedNotes.encrypted.markdown!);
    })

    test('should reject an incorrect secret', async () => {
        await notePage.openDecryptionDialog();
        await notePage.submitPassphrase(`wrong-${seedNotes.encrypted.passphrase}`);
        await expect(notePage.passphraseError).toHaveText('Segredo incorreto.');
    })

    test('should decrypt the note with the correct secret', async () => {
        await notePage.openDecryptionDialog();
        await notePage.decryptWithPassphrase(seedNotes.encrypted.passphrase!, seedNotes.encrypted.markdown!);
    })

    test.describe('when the note is decrypted', () => {

        test.beforeEach(async () => {
            await notePage.openDecryptionDialog();
            await notePage.decryptWithPassphrase(seedNotes.encrypted.passphrase!, seedNotes.encrypted.markdown!);
        })

        test('should save note edits as ciphertext with the save shortcut', async () => {
            test.setTimeout(90_000);
            await notePage.startEditing();
            await notePage.fillMarkdown(`${seedNotes.encrypted.markdown!}-edited`);
            const payload = (await notePage.saveMarkdownWithShortcut()).postDataJSON() as { markdown: string };

            expect(payload.markdown).not.toContain(`${seedNotes.encrypted.markdown!}-edited`);
            await expect(notePage.preview).toContainText(`${seedNotes.encrypted.markdown!}-edited`);
        })

        test('should require the secret again after reloading', async ({ authenticatedPage: page }) => {
            await page.reload();
            await expect(notePage.decryptButton).toBeVisible();
            await expect(notePage.preview).not.toContainText(seedNotes.encrypted.markdown!);
        })

    })

})