import { expect, test } from '@e2e/fixtures/auth';
import { SearchTagsPage } from '@e2e/pages';

test.describe.configure({ mode: 'serial' });
test.describe('Search - tags filtering', () => {

    let searchPage: SearchTagsPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        searchPage = new SearchTagsPage(authenticatedPage);
        await searchPage.open();
    })

    test('search for "tag" should display only notes that contain the tag', async () => {
        await searchPage.filterByType('tags');
        await searchPage.search('tag');
        const texts = await searchPage.getArticlesTags();
        expect(texts.length).toBeGreaterThan(0);
        for (const text of texts) expect(text.toLowerCase()).toContain('tag');
    })

})