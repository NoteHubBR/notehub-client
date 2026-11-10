import { FilterDropdown } from '../user.page.filter.dropdown';
import { Locator, Page } from '@playwright/test';
import { SearchableListPage } from '../user.page.searchable.list';

export class UserNotesPage extends SearchableListPage {

    readonly typeFilter: FilterDropdown;
    readonly tagFilter: FilterDropdown;
    readonly orderFilter: FilterDropdown;
    readonly sortFilter: FilterDropdown;
    readonly tagSearchInput: Locator;
    readonly noteArticles: Locator;
    readonly noteCommentsCount: Locator;
    readonly noteFlamesCount: Locator;
    readonly hiddenStatusIcons: Locator;
    readonly encryptedStatusIcons: Locator;
    readonly noteTags: Locator;
    readonly noteCommentsLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.typeFilter = new FilterDropdown(page, {
            selectButton: page.getByTestId('select-type'),
            menu: page.getByTestId('type-menu'),
            closeButton: page.getByTestId('close-type-menu'),
            options: page.locator('[data-testid^="option-type-"]'),
            selectedOption: page.getByTestId('option-type-all').locator('span[role="option"]'),
            testIdPrefix: 'option-type-',
            paramName: 'type',
            mapValue: (v) => (v === 'all' ? null : v),
        })
        this.tagFilter = new FilterDropdown(page, {
            selectButton: page.getByTestId('select-tag'),
            menu: page.getByTestId('tags-menu'),
            closeButton: page.getByTestId('close-tags-menu'),
            options: page.locator('[data-testid^="option-tag-"]'),
            selectedOption: page.getByTestId('option-tag-all').locator('span[role="option"]'),
            testIdPrefix: 'option-tag-',
            paramName: 'tag',
            mapValue: (v) => (v === 'all' ? null : v),
        })
        this.orderFilter = new FilterDropdown(page, {
            selectButton: page.getByTestId('select-order'),
            menu: page.getByTestId('order-menu'),
            closeButton: page.getByTestId('close-order-menu'),
            options: page.locator('[data-testid^="option-order-"]'),
            selectedOption: page.getByTestId('option-order-modifiedAt').locator('span[role="option"]'),
            testIdPrefix: 'option-order-',
            paramName: 'order',
        })
        this.sortFilter = new FilterDropdown(page, {
            selectButton: page.getByTestId('select-sort'),
            menu: page.getByTestId('sort-menu'),
            closeButton: page.getByTestId('close-sort-menu'),
            options: page.locator('[data-testid^="option-sort-"]'),
            selectedOption: page.getByTestId('option-sort-desc').locator('span[role="option"]'),
            testIdPrefix: 'option-sort-',
            paramName: 'sort',
        })
        this.tagSearchInput = page.getByPlaceholder('Filtrar...');
        this.noteArticles = page.locator('article');
        this.noteCommentsCount = page.getByTestId('comment-count');
        this.noteFlamesCount = page.getByTestId('flame-count');
        this.hiddenStatusIcons = page.getByTestId('note-status-hidden');
        this.encryptedStatusIcons = page.getByTestId('note-status-encrypted');
        this.noteTags = page.locator('article nav ul li a');
        this.noteCommentsLabel = page.locator('footer a');
    }

    noteArticle(name: string): Locator {
        return this.noteArticles.filter({ hasText: name });
    }

    async getTagOptionsTexts(): Promise<string[]> {
        return this.tagFilter.getOptionsTexts();
    }

    async getCommentsCount(limit?: number): Promise<number[]> {
        const all = await this.noteCommentsCount.evaluateAll(
            (elements) => elements.map((el) => Number(el.textContent?.trim() ?? '0'))
        )
        return limit ? all.slice(0, limit) : all;
    }

    async getFirstTwoCommentsCount(): Promise<[number, number]> {
        const [first, second] = await this.getCommentsCount(2);
        if (first !== undefined && second !== undefined) return [first, second];
        throw new Error('Must have at least 2 notes in the result to validate sorting.');
    }

    async getFlamesCount(limit?: number): Promise<number[]> {
        const all = await this.noteFlamesCount.evaluateAll(
            (elements) => elements.map((el) => Number(el.textContent?.trim() ?? '0'))
        )
        return limit ? all.slice(0, limit) : all;
    }

    async getFirstTwoFlamesCount(): Promise<[number, number]> {
        const [first, second] = await this.getFlamesCount(2);
        if (first !== undefined && second !== undefined) return [first, second];
        throw new Error('Must have at least 2 notes in the result to validate sorting.');
    }

    async getArticlesTags(): Promise<string[]> {
        return this.noteTags.evaluateAll(
            (elements) => elements.map((el) => el.textContent?.trim() ?? '')
        )
    }

    async getArticlesCommentsLabel(): Promise<string[]> {
        return this.noteCommentsLabel.evaluateAll(
            (elements) => elements.map((el) => el.textContent?.trim() ?? '')
        )
    }

}