import { expect, test } from '@e2e/fixtures/auth';
import { seedUsers } from '@e2e/fixtures/seeds';
import { UserFollowsPage } from '@e2e/pages';

test.describe('User following page', () => {

    let followsPage: UserFollowsPage;

    test.beforeAll(async ({ authenticatedPage }) => {
        followsPage = new UserFollowsPage(authenticatedPage);
        await followsPage.goto('/');
        await followsPage.openAndWaitForProfile();
        await followsPage.following.click();
    })

    test('should display the correct initial state', async () => {
        await expect(followsPage.followerSorter).toBeDisabled();
        await followsPage.expectParams({ q: null, order: null, sort: null });
    })

    test('should sort users alphabetically from a to z', async () => {
        await followsPage.sortByAz();
        await followsPage.expectParams({ order: 'username', sort: 'asc' });
        await expect(followsPage.users.first()).toBeVisible();
        const usernames = await followsPage.getFirstTwoUsernames();
        expect(usernames.length).toBeGreaterThan(0);
        const sortedUsernames = [...usernames].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }))
        expect(usernames).toEqual(sortedUsernames);
    })

    test('should sort users alphabetically from z to a', async () => {
        await followsPage.sortByZa();
        await followsPage.expectParams({ order: 'username', sort: 'desc' });
        await expect(followsPage.users.first()).toBeVisible();
        const usernames = await followsPage.getFirstTwoUsernames();
        expect(usernames.length).toBeGreaterThan(0);
        const sortedUsernames = [...usernames].sort((a, b) => b.localeCompare(a, 'pt-BR', { sensitivity: 'base' }))
        expect(usernames).toEqual(sortedUsernames);
    })

    test('should sort users by follower count in descending order', async () => {
        await followsPage.sortByFollowers();
        await followsPage.expectParams({ order: 'followersCount', sort: 'desc' });
        await expect(followsPage.users.first()).toBeVisible();
        const [first, second] = await followsPage.getFirstTwoFollowerCount();
        expect(first).toBeGreaterThanOrEqual(second);
    })

    test('should display only users matching the search query', async () => {
        await followsPage.searchUser('userb');
        await followsPage.expectParams({ q: 'userb' });
        expect(followsPage.users.first()).toBeVisible();
        const usernames = await followsPage.getUsernames();
        expect(usernames.length).toBeGreaterThan(0);
        for (const u of usernames) expect(u.toLowerCase()).toContain('userb');
    })

    test('should display empty results when no users match the search term', async () => {
        await followsPage.searchUser('xyz');
        await followsPage.expectParams({ q: 'xyz' });
        await expect(followsPage.emptyResultsDialog).toBeVisible();
    })

    test('should display the private profile dialog when accessing a private profile without mutual access', async () => {
        await followsPage.goto(`/${seedUsers.userc.username}/followers`);
        await expect(followsPage.privateProfileDialog).toBeVisible();
    })

})