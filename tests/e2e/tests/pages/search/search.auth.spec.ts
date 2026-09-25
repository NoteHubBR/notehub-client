import { expect, test } from '@e2e/fixtures/auth';
import { SearchPage } from '@e2e/pages';

test.describe.configure({ mode: 'serial' });
test.describe('Search - params application', () => {

    let searchPage: SearchPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        searchPage = new SearchPage(authenticatedPage);
        await searchPage.open();
    })

    test('should initialize with "Relevance" active by default (without type order)', async () => {
        await expect(searchPage.relevanceSorter).toBeDisabled();
        await searchPage.expectParams({ type: null });
    })

    test('clicking "Recent" should apply order=createdAt&sort=desc', async () => {
        await searchPage.sortByRecent();
        await searchPage.expectParams({ order: 'createdAt', sort: 'desc' });
    })

    test('clicking "Old" should apply order=createdAt&sort=asc', async () => {
        await searchPage.sortByOld();
        await searchPage.expectParams({ order: 'createdAt', sort: 'asc' });
    })

    test('clicking "Relevance" after another filter should apply order=relevant&sort=desc', async () => {
        await searchPage.sortByRecent();
        await searchPage.sortByRelevance();
        await searchPage.expectParams({ order: 'relevant', sort: 'desc' });
    })

    test('should initialize with "Notes" active by default (without type parameter)', async () => {
        await expect(searchPage.notesSorter).toBeDisabled();
        await searchPage.expectParams({ type: null });
    })

    test('clicking "Tags" should apply type=tags', async () => {
        await searchPage.filterByType('tags');
        await searchPage.expectParams({ type: 'tags' });
    })

    test('clicking "People" should apply type=users', async () => {
        await searchPage.filterByType('users');
        await searchPage.expectParams({ type: 'users' });
    })

    test('clicking "Notes" after another filter should apply type=notes explicitly', async () => {
        await searchPage.filterByType('notes');
        await searchPage.expectParams({ type: 'notes' });
    })

    test('search for "note" should apply the q parameter in the url', async () => {
        await searchPage.search('note');
        await searchPage.expectParams({ q: 'note' });
    })

})