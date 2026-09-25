import { expect, Locator, Page } from '@playwright/test';
import { seedUsers } from '@e2e/fixtures/seeds';
import { Sidebar } from '@e2e/components';

export class UserPage {

    readonly page: Page;
    readonly sidebar: Sidebar;
    readonly profile: Locator;
    readonly banner: Locator;
    readonly avatar: Locator;
    readonly about: Locator;
    readonly notes: Locator;
    readonly flames: Locator;
    readonly followers: Locator;
    readonly following: Locator;
    readonly main: Locator;
    readonly mainTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = new Sidebar(page);
        this.profile = page.locator('header');
        this.banner = this.profile.getByRole('banner');
        this.avatar = this.banner.getByRole('img', { name: `Avatar de ${seedUsers.usera.username}` });
        this.about = this.profile.getByRole('link', { name: 'Visão Geral' });
        this.notes = this.profile.getByRole('link', { name: 'Notas' });
        this.flames = this.profile.getByRole('link', { name: 'Chamas' });
        this.main = page.getByRole('main');
        this.followers = this.main.getByRole('link', { name: 'seguidores' });
        this.following = this.main.getByRole('link', { name: 'seguindo' });
        this.mainTitle = this.main.getByRole('heading', { level: 2 });
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    private async open() {
        await this.sidebar.navigateTo('Você');
        await expect(this.page).toHaveURL(seedUsers.usera.username);
    }

    private async waitForResponse(action: () => Promise<void>, url: string) {
        const [response] = await Promise.all([
            this.page.waitForResponse((res) =>
                res.url().includes(url) && res.ok()),
            action(),
        ])
        return response;
    }

    async openAndWaitForProfile() {
        await this.waitForResponse(
            () => this.open(),
            `users/${seedUsers.usera.username}`
        )
    }

    async expectProfileLoaded() {
        await expect(this.banner).toBeVisible();
        await expect(this.avatar).toBeVisible();
        await expect(this.main).toBeVisible();
        await expect(this.mainTitle).toBeVisible();
    }

    async clickAndWaitActive(locator: Locator) {
        await locator.click();
        await expect(locator).toHaveAttribute('aria-current', 'page');
    }

}