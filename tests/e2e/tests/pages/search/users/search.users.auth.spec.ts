import { expect, test } from '@e2e/fixtures/auth';
import { SearchUsersPage } from '@e2e/pages';

test.describe.configure({ mode: 'serial' });
test.describe('Search - users sorting and filtering', () => {

    let searchPage: SearchUsersPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        searchPage = new SearchUsersPage(authenticatedPage);
        await searchPage.open();
    })

    test('sort by "Recent" should display the newest user first', async () => {
        await searchPage.filterByType('users');
        await searchPage.sortByRecent();
        const [first, second] = await searchPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeGreaterThanOrEqual(new Date(second).getTime());
    })

    test('sort by "Old" should display the oldest user first', async () => {
        await searchPage.sortByOld();
        const [first, second] = await searchPage.getFirstTwoTimestamps();
        expect(new Date(first).getTime()).toBeLessThanOrEqual(new Date(second).getTime());
    })

    test('sort by "Relevance" should display the more followed user first', async () => {
        await searchPage.sortByRelevance();
        const [first, second] = await searchPage.getFirstTwoFollowersCount();
        expect(first).toBeGreaterThanOrEqual(second);
    })

    test('search for "user" should display only users that contain the term', async () => {
        await searchPage.search('user');
        const texts = await searchPage.getArticlesUsernames();
        expect(texts.length).toBeGreaterThan(0);
        for (const text of texts) expect(text.toLowerCase()).toContain('user');
    })

})