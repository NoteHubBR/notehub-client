import { Locator } from '@playwright/test';
import { seedUsers } from '@e2e/fixtures/seeds';
import { Sidebar } from '@e2e/components';
import { test, expect } from '@e2e/fixtures/auth';

test.describe('Sidebar', () => {

    let sidebar: Sidebar;

    test.beforeAll(async ({ authenticatedPage }) => {
        sidebar = new Sidebar(authenticatedPage);
        await sidebar.root.isVisible();
    })

    const testLink = async (locator: Locator, path?: string) => {
        const state = await sidebar.root.getAttribute('data-state');
        const minimized = state === 'minimized';
        const pathname = path
            ? `/${seedUsers.usera.username}/${path}`
            : `/${seedUsers.usera.username}`;
        if (minimized) await sidebar.navbar.click(sidebar.navbar.sidebarButton);
        await sidebar.click(locator);
        await sidebar.verifyAriaCurrent(locator);
        await sidebar.verifyPathname(pathname);
    }

    test.describe('visibility', () => {

        test('should open the sidebar', async () => {
            await sidebar.navbar.click(sidebar.navbar.sidebarButton);
            await expect(sidebar.root).toHaveAttribute('data-state', 'maximized');
        })

        test('should close the sidebar', async () => {
            await sidebar.navbar.click(sidebar.navbar.sidebarButton);
            await expect(sidebar.root).toHaveAttribute('data-state', 'minimized');
        })

    })

    test.describe('navigation', () => {

        test('should navigate to the user profile', async () => {
            await testLink(sidebar.profile);
        })

        test('should navigate to the user notes', async () => {
            await testLink(sidebar.notes, 'notes');
        })

        test('should navigate to the user flames', async () => {
            await testLink(sidebar.flames, 'flames');
        })

        test('should navigate to the following page', async () => {
            await testLink(sidebar.following, 'following');
        })

        test('should navigate to note creation', async () => {
            await sidebar.click(sidebar.new);
            await sidebar.verifyAriaCurrent(sidebar.new);
            await sidebar.verifyPathname('/new');
        })

        test('should navigate to a followed user profile', async () => {
            const user = sidebar.followingItems.first();

            await sidebar.click(user);
            await sidebar.verifyAriaCurrent(user);
            await sidebar.verifyPathname('/userb');
        })

    })

    test.describe('filtering', () => {

        test('should filter notes by query', async () => {
            await sidebar.fillFilter('notea');
            await sidebar.click(sidebar.notesItems.first());
            await sidebar.verifyAriaCurrent(sidebar.notesItems.first());
        })

    })

})