import { expect, test } from '@e2e/fixtures/auth';
import { seedUsers } from '@e2e/fixtures/seeds';
import { UserFlamesPage } from '@e2e/pages';

test.describe('User flames page', () => {

    let flamesPage: UserFlamesPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        flamesPage = new UserFlamesPage(authenticatedPage);
        await flamesPage.goto('/');
        await flamesPage.openAndWaitForProfile();
        await flamesPage.flames.click();
    })

    test('should display the correct initial state', async () => {
        await expect(flamesPage.recentSorter).toBeDisabled();
        await flamesPage.expectParams({ sort: null });
    })

    test('should sort notes by old when the old sorter is clicked', async () => {
        await flamesPage.sortByOld();
        await expect(flamesPage.noteArticles.first()).toBeVisible();
        await flamesPage.expectParams({ sort: 'asc' });
        const [first, second] = await flamesPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeLessThanOrEqual(new Date(second).getTime());
    })

    test('should sort notes by recent when the recent sorter is clicked', async () => {
        await flamesPage.sortByRecent();
        await expect(flamesPage.noteArticles.first()).toBeVisible();
        await flamesPage.expectParams({ sort: 'desc' });
        const [first, second] = await flamesPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeGreaterThanOrEqual(new Date(second).getTime());
    })

    test('should display search results when a search term is entered', async () => {
        await flamesPage.search('note');
        await expect(flamesPage.noteArticles.first()).toBeVisible();
        await flamesPage.expectParams({ q: 'note' });
        const texts = await flamesPage.getArticlesTitles();
        expect(texts.length).toBeGreaterThan(0);
        for (const text of texts) expect(text.toLowerCase()).toContain('note');
    })

    test('should display empty results when no notes match the search term', async () => {
        await flamesPage.search('xyz');
        await expect(flamesPage.noteArticles.first()).toBeVisible();
        await flamesPage.expectParams({ q: 'xyz' });
        await expect(flamesPage.emptyResultsDialog).toBeVisible();
    })

    test('should display private profile dialog when accessing a not mutual private profile', async () => {
        await flamesPage.goto(`/${seedUsers.userc.username}/flames`);
        await expect(flamesPage.privateProfileDialog).toBeVisible();
    })

})