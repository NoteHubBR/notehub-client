import { expect, test } from '@e2e/fixtures/auth';
import { Navbar } from '@e2e/components';
import { seedUsers } from '@e2e/fixtures/seeds';

test.describe('Navbar - navigation, search, dropdowns and user actions', () => {

    let navbar: Navbar;

    test.beforeAll(async ({ authenticatedPage }) => {
        navbar = new Navbar(authenticatedPage);
        await navbar.root.isVisible();
    })

    test('should search for a query and preserve it in search history', async () => {
        await navbar.fillSearch('xyz');
        await navbar.pressSearch();
        await navbar.verifyPathname('/search');
        await navbar.click(navbar.inputSearch);
        await expect(navbar.searches).toBeVisible();
        expect(await navbar.getSearchesCount()).toBeGreaterThan(0);
        const searches = await navbar.getSearches();
        expect(searches[0]).toContain('xyz');
    })

    test('should clear the search input and prevent navigation with an empty query', async () => {
        await navbar.click(navbar.homeButton);
        await navbar.click(navbar.inputSearch);
        await navbar.fillSearch('xyz');
        await expect(navbar.inputSearch).toHaveValue('xyz');
        await expect(navbar.searches).toBeVisible();
        await navbar.click(navbar.inputSearchCleaner.first());
        await expect(navbar.inputSearch).toHaveValue('');
        await navbar.pressSearch();
        await navbar.verifyPathname('/');
    })

    test('should apply a search from the search history', async () => {
        await navbar.click(navbar.inputSearch);
        await expect(navbar.searches).toBeVisible();
        await navbar.click(navbar.searchApply.first());
        await expect(navbar.inputSearch).toHaveValue('xyz');
        await navbar.pressSearch();
        await navbar.verifyPathname('/search');
    })

    test('should close the search history with the Escape key', async () => {
        await navbar.click(navbar.inputSearch);
        await expect(navbar.searches).toBeVisible();
        await navbar.pressEscape(navbar.inputSearch);
        await expect(navbar.searches).toBeHidden();
    })

    test('should remove a search from history and close the search history list', async () => {
        await navbar.inputSearch.blur();
        await navbar.click(navbar.inputSearch);
        await expect(navbar.searches).toBeVisible();
        await navbar.click(navbar.searchDelete.first());
        await expect(navbar.searches).toBeHidden();
    })

    test('should open and close notification and options dropdowns by clicking their triggers', async () => {
        await navbar.click(navbar.notificationsButton);
        await expect(navbar.notifications).toBeVisible();
        await navbar.click(navbar.notificationsButton);
        await expect(navbar.notifications).toBeHidden();
        await navbar.click(navbar.optionsButton);
        await expect(navbar.options).toBeVisible();
        await navbar.click(navbar.optionsButton);
        await expect(navbar.options).toBeHidden();
    })

    test('should close notification and options dropdowns with the Escape key', async () => {
        await navbar.click(navbar.notificationsButton);
        await expect(navbar.notifications).toBeVisible();
        await navbar.pressEscape(navbar.notificationsButton);
        await expect(navbar.notifications).toBeHidden();
        await navbar.click(navbar.optionsButton);
        await expect(navbar.options).toBeVisible();
        await navbar.pressEscape(navbar.optionsButton);
        await expect(navbar.options).toBeHidden();
    })

    test('should navigate to the target associated with a notification', async () => {
        await navbar.click(navbar.notificationsButton);
        await expect(navbar.notifications).toBeVisible();
        await navbar.click(navbar.notificationItem.first());
        await navbar.verifyPathname('/', false);
    })

    test('should navigate to the new note page', async () => {
        await navbar.click(navbar.newNoteButton);
        await navbar.verifyPathname('/new');
    })

    test('should navigate to the user profile from the options menu', async () => {
        await navbar.choseOption(navbar.optionProfile);
        await navbar.verifyPathname(`/${seedUsers.usera.username}`);
    })

    test('should navigate to appearance settings from the options menu', async () => {
        await navbar.choseAppearenceOption(navbar.optionThemes);
        await navbar.verifyPathname('/settings/appearance');
    })

    test('should navigate to account settings from the options menu', async () => {
        await navbar.choseOption(navbar.optionConfigs);
        await navbar.verifyPathname('/settings/account');
    })

    test('should navigate to the home page', async () => {
        await navbar.click(navbar.homeButton);
        await navbar.verifyPathname('/');
    })

    test('should log out the authenticated user from the options menu', async () => {
        await navbar.choseOption(navbar.optionLogout);
        await expect(navbar.optionsButton).toBeHidden();
    })

})