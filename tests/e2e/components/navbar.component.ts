import { Page, Locator, expect } from '@playwright/test';

export class Navbar {

    readonly page: Page;
    readonly root: Locator;
    readonly sidebarButton: Locator;
    readonly homeButton: Locator;
    readonly inputSearch: Locator;
    readonly inputSearchButton: Locator;
    readonly inputSearchCleaner: Locator;
    readonly searches: Locator;
    readonly search: Locator;
    readonly searchDelete: Locator;
    readonly searchApply: Locator;
    readonly newNoteButton: Locator;
    readonly notificationsButton: Locator;
    readonly notifications: Locator;
    readonly notificationItem: Locator;
    readonly optionsButton: Locator;
    readonly options: Locator;
    readonly optionProfile: Locator;
    readonly optionAppearance: Locator;
    readonly appearanceOptions: Locator;
    readonly optionThemes: Locator;
    readonly optionConfigs: Locator;
    readonly optionLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.getByRole('navigation', { name: 'Navegação principal' });
        this.sidebarButton = this.root.getByRole('button', { name: 'Abrir menu' });
        this.homeButton = this.root.getByRole('link', { name: 'Início' });
        this.inputSearch = this.root.getByPlaceholder('Pesquisar');
        this.inputSearchButton = this.root.getByRole('button', { name: 'Consultar' });
        this.inputSearchCleaner = this.root.getByRole('button', { name: 'Apagar' });
        this.searches = this.root.getByTestId('searches');
        this.search = this.searches.getByRole('link');
        this.searchDelete = this.searches.getByRole('button', { name: 'Remover pesquisa' });
        this.searchApply = this.searches.getByRole('button', { name: 'Aplicar pesquisa' });
        this.newNoteButton = this.root.getByRole('button', { name: 'Criar nota' });
        this.notificationsButton = this.root.getByRole('button', { name: 'Ler notificações' });
        this.notifications = page.getByRole('list', { name: 'Notificações' });
        this.notificationItem = this.notifications.getByRole('link');
        this.optionsButton = page.getByRole('button', { name: 'Mais opções' });
        this.options = page.getByRole('menu', { name: 'Opções' });
        this.optionProfile = this.options.getByRole('link', { name: 'Acessar perfil' });
        this.optionAppearance = this.options.getByRole('button', { name: 'Temas' });
        this.appearanceOptions = page.getByRole('menu', { name: 'Aparências' });
        this.optionThemes = this.appearanceOptions.getByRole('link', { name: 'Temas' });
        this.optionConfigs = this.options.getByRole('link', { name: 'Configurações' });
        this.optionLogout = this.options.getByRole('button', { name: 'Sair' });
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

    async click(locator: Locator) {
        await locator.click();
    }

    async pressEscape(locator: Locator) {
        await locator.press('Escape');
    }

    async fillSearch(query: string) {
        await this.inputSearch.fill(query);
    }

    async pressSearch() {
        await this.inputSearchButton.click();
    }

    async getSearchesCount(): Promise<number> {
        return this.search.count();
    }

    async getSearches(): Promise<string[]> {
        return this.search.evaluateAll(
            elements => elements.map(el => el.textContent?.trim() ?? '')
        )
    }

    async choseOption(locator: Locator) {
        await this.optionsButton.click();
        await locator.click();
    }

    async choseAppearenceOption(locator: Locator) {
        await this.choseOption(this.optionAppearance);
        await locator.click();
    }

}