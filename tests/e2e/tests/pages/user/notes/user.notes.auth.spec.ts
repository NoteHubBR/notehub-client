import { expect, test } from '@e2e/fixtures/auth';
import { seedUsers } from '@e2e/fixtures/seeds';
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

    test('should display only closed notes when filtered by type "closed"', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-closed').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const comments = await notesPage.getArticlesCommentsLabel();
        expect(comments.length).toBeGreaterThan(0);
        for (const c of comments) expect(c.toLowerCase()).toContain('fechado');
    })

    test('should display only closed notes when filtered by type "hidden"', async () => {
        await notesPage.typeFilter.open();
        await notesPage.typeFilter.getOption('option-type-hidden').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const totalNotes = await notesPage.noteArticles.count();
        const hiddenNotes = await notesPage.noteSVGS.count();
        expect(totalNotes).toBeGreaterThan(0);
        expect(hiddenNotes).toBe(totalNotes);
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
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const tags = await notesPage.getArticlesTags();
        expect(tags.length).toBeGreaterThan(0);
        for (const t of tags) expect(t.toLowerCase()).toContain('other');
    })

    test('should sort notes alphabetically by title', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-asc').click();
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-name').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const titles = await notesPage.getFirstTwoTitles();
        expect(titles.length).toBeGreaterThan(0);
        const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }))
        expect(titles).toEqual(sortedTitles);
    })

    test('should sort notes by comment count in descending order', async () => {
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-commentsCount').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const [first, second] = await notesPage.getFirstTwoCommentsCount();
        expect(first).toBeGreaterThanOrEqual(second);
    })

    test('should sort notes by flame count in descending order', async () => {
        await notesPage.orderFilter.open();
        await notesPage.orderFilter.getOption('option-order-flamesCount').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const [first, second] = await notesPage.getFirstTwoFlamesCount();
        expect(first).toBeGreaterThanOrEqual(second);
    })

    test('should display oldest notes first', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-asc').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const [first, second] = await notesPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeLessThanOrEqual(new Date(second).getTime());
    })

    test('should display newest notes first', async () => {
        await notesPage.about.click();
        await notesPage.notes.click();
        await notesPage.sortFilter.open();
        await notesPage.sortFilter.getOption('option-sort-desc').click();
        await expect(notesPage.noteArticles.first()).toBeVisible();
        const [first, second] = await notesPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeGreaterThanOrEqual(new Date(second).getTime());
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