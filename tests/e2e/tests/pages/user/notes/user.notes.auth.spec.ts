import { expect, test } from '@e2e/fixtures/auth';
import { seedNotes, seedUsers } from '@e2e/fixtures/seeds';
import { UserNotesPage } from '@e2e/pages';

test.describe('User notes page', () => {

    let notesPage: UserNotesPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        notesPage = new UserNotesPage(authenticatedPage);
        await notesPage.goto('/');
        await notesPage.openAndWaitForProfile();
        await notesPage.notes.click();
    })

    test('should display the default selected filters', async () => {
        await expect(notesPage.typeFilter.selectedOption).toHaveAttribute('aria-selected', 'true')
        await expect(notesPage.tagFilter.selectedOption).toHaveAttribute('aria-selected', 'true')
        await expect(notesPage.orderFilter.selectedOption).toHaveAttribute('aria-selected', 'true')
        await expect(notesPage.sortFilter.selectedOption).toHaveAttribute('aria-selected', 'true')
    })

    test('should open and close all menus', async () => {
        const filters = [notesPage.typeFilter, notesPage.tagFilter, notesPage.orderFilter, notesPage.sortFilter];
        for (const filter of filters) {
            await filter.open();
            await expect(filter.menu).toHaveAttribute('aria-hidden', 'false');
            await filter.close();
            await expect(filter.menu).toHaveAttribute('aria-hidden', 'true');
        }
    })

    test('should filter by all type options', async () => {
        await notesPage.typeFilter.testAllOptions((expected) => notesPage.expectParams(expected));
    })

    test('should filter by all tag options', async () => {
        await notesPage.tagFilter.testAllOptions((expected) => notesPage.expectParams(expected));
    })

    test('should filter by all order options', async () => {
        await notesPage.orderFilter.testAllOptions((expected) => notesPage.expectParams(expected));
    })

    test('should filter by all sort options', async () => {
        await notesPage.sortFilter.testAllOptions((expected) => notesPage.expectParams(expected));
    })

    test('should include notes with closed comments among open notes', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-open').click();
        const closedNote = notesPage.noteArticle(seedNotes.cnote.name);
        await expect(closedNote).toBeVisible();
        await expect(closedNote.getByText('Fechado')).toBeVisible();
    })

    test('should display only encrypted notes when filtered by type "encrypted"', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes?q=note`);
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toBeVisible();
        await expect(notesPage.noteArticle(seedNotes.encrypted.name)).toBeVisible();
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-encrypted').click();
        await notesPage.expectParams({ type: 'encrypted' });
        await expect(notesPage.noteArticle(seedNotes.encrypted.name)).toBeVisible();
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toHaveCount(0);
        const totalNotes = await notesPage.noteArticles.count();
        const encryptedNotes = await notesPage.encryptedStatusIcons.count();
        expect(totalNotes).toBeGreaterThan(0);
        expect(encryptedNotes).toBe(totalNotes);
    })

    test('should display only hidden notes when filtered by type "hidden"', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes?q=note`);
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toBeVisible();
        await expect(notesPage.noteArticle(seedNotes.hnote.name)).toBeVisible();
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-hidden').click();
        await notesPage.expectParams({ type: 'hidden' });
        await expect(notesPage.noteArticle(seedNotes.hnote.name)).toBeVisible();
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toHaveCount(0);
        const totalNotes = await notesPage.noteArticles.count();
        const hiddenNotes = await notesPage.hiddenStatusIcons.count();
        expect(totalNotes).toBeGreaterThan(0);
        expect(hiddenNotes).toBe(totalNotes);
    })

    test('should reveal a hidden note after a long press without opening it', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes?q=note`);
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toBeVisible();
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-hidden').click();
        const hiddenNote = notesPage.noteArticle(seedNotes.hnote.name);
        await expect(hiddenNote).toBeVisible();
        await expect(notesPage.noteArticle(seedNotes.notea.name)).toHaveCount(0);

        const currentUrl = notesPage.page.url();
        await hiddenNote.hover();
        await notesPage.page.mouse.down();
        await expect(hiddenNote).toHaveClass(/blur-none/);
        await notesPage.page.mouse.up();
        await expect(notesPage.page).toHaveURL(currentUrl);
    })

    test('should offer a separate type for notes that are both hidden and encrypted', async () => {
        await notesPage.typeFilter.open();
        await expect(notesPage.typeFilter.getOption('option-type-ghost')).toHaveText('fantasmas');
        await expect(notesPage.typeFilter.getOption('option-type-closed')).toHaveCount(0);
    })

    test('should display only tags that match the search input', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.tagFilter.open();
        await notesPage.tagSearchInput.fill('other');
        const options = await notesPage.getTagOptionsTexts();
        expect(options.length).toBeGreaterThan(0);
        for (const option of options) {
            const text = option.trim().toLowerCase();
            if (text === 'todas') continue;
            expect(text).toContain('other');
        }
    })

    test('should display only notes containing the selected tag', async () => {
        await notesPage.tagFilter.getOption('option-tag-other').click();
        await expect.poll(async () => {
            const tags = await notesPage.getArticlesTags();
            return tags.length > 0 && tags.every((tag) => tag.toLowerCase().includes('other'));
        }).toBeTruthy();
    })

    test('should sort notes alphabetically by title', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-asc').click();
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-name').click();
        await expect.poll(async () => {
            const titles = await notesPage.getArticlesTitles(2);
            if (titles.length < 2) return false;
            return titles[0].localeCompare(titles[1], 'pt-BR', { sensitivity: 'base' }) <= 0;
        }).toBeTruthy();
    })

    test('should sort notes by comment count in descending order', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes`);
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-commentsCount').click();
        await expect.poll(async () => {
            const [first, second] = await notesPage.getCommentsCount(2);
            return first !== undefined && second !== undefined && first >= second;
        }).toBeTruthy();
    })

    test('should sort notes by flame count in descending order', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes`);
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-flamesCount').click();
        await expect.poll(async () => {
            const [first, second] = await notesPage.getFlamesCount(2);
            return first !== undefined && second !== undefined && first >= second;
        }).toBeTruthy();
    })

    test('should display oldest notes first', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes`);
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-createdAt').click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-asc').click();
        await notesPage.expectParams({ order: 'createdAt', sort: 'asc' });
        await expect.poll(async () => {
            const timestamps = await notesPage.getTimestamps();
            if (timestamps.length < 2) return false;
            return timestamps.every((timestamp, index) =>
                index === 0 || new Date(timestamps[index - 1]).getTime() <= new Date(timestamp).getTime()
            );
        }).toBeTruthy();
    })

    test('should display newest notes first', async () => {
        await notesPage.goto(`/${seedUsers.usera.username}/notes`);
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-createdAt').click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-desc').click();
        await notesPage.expectParams({ order: 'createdAt', sort: 'desc' });
        await expect.poll(async () => {
            const timestamps = await notesPage.getTimestamps();
            if (timestamps.length < 2) return false;
            return timestamps.every((timestamp, index) =>
                index === 0 || new Date(timestamps[index - 1]).getTime() >= new Date(timestamp).getTime()
            );
        }).toBeTruthy();
    })

    test('should display search results when a search term is entered', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.search('note');
        await expect(notesPage.noteArticles.first()).toBeVisible();
        await notesPage.expectParams({ q: 'note' });
        const texts = await notesPage.getArticlesTitles();
        expect(texts.length).toBeGreaterThan(0);
        for (const text of texts) expect(text.toLowerCase()).toContain('note');
    })

    test('should display empty results when no notes match the search term', async () => {
        await notesPage.search('xyz');
        await expect(notesPage.noteArticles.first()).toBeVisible();
        await notesPage.expectParams({ q: 'xyz' });
        await expect(notesPage.emptyResultsDialog).toBeVisible();
    })

    test('should display the private profile dialog when accessing a private profile without mutual access', async () => {
        await notesPage.goto(`/${seedUsers.userc.username}/notes`);
        await expect(notesPage.privateProfileDialog).toBeVisible();
    })

})