import { Navbar } from './navbar.component';
import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {

    readonly page: Page;
    readonly navbar: Navbar;
    readonly root: Locator;
    readonly home: Locator;
    readonly profile: Locator;
    readonly notes: Locator;
    readonly flames: Locator;
    readonly following: Locator;
    readonly followingList: Locator;
    readonly followingItems: Locator;
    readonly new: Locator;
    readonly filter: Locator;
    readonly notesList: Locator;
    readonly notesItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new Navbar(page);
        this.root = page.getByTestId('sidebar');
        this.home = this.root.getByRole('link', { name: 'Início' });
        this.profile = this.root.getByRole('link', { name: 'Você' });
        this.notes = this.root.getByRole('link', { name: 'Suas notas' });
        this.flames = this.root.getByRole('link', { name: 'Notas com "chama"' });
        this.following = this.root.getByRole('link', { name: 'Seguindo' });
        this.followingList = this.root.getByRole('list', { name: 'Seguindo' });
        this.followingItems = this.followingList.getByRole('link');
        this.new = this.root.getByRole('link', { name: 'nova nota' });
        this.filter = this.root.locator('section div input');
        this.notesList = this.root.getByRole('list', { name: 'Notas' });
        this.notesItems = this.notesList.getByRole('link');
    }

    link(text: string): Locator {
        return this.root.getByRole('link', { name: text, exact: true });
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async navigateTo(text: string) {
        let target = this.link(text);
        if (await target.count() === 0 && await this.root.getAttribute('data-state') === 'maximized') {
            await this.navbar.sidebarButton.click();
            await expect(this.root).toHaveAttribute('data-state', 'minimized');
            target = this.link(text);
        }
        await target.click();
    }

    async verifyPathname(expectedPath: string, toHavePath: boolean = true) {
        const expected = expect.poll(() => {
            const currentUrl = new URL(this.page.url());
            return currentUrl.pathname;
        })
        return toHavePath
            ? await expected.toBe(expectedPath)
            : await expected.not.toBe(expectedPath)
    }

    async verifyAriaCurrent(locator: Locator) {
        await expect(locator).toHaveAttribute('aria-current', 'page');
    }

    async fillFilter(query: string) {
        await this.filter.fill(query);
    }

}