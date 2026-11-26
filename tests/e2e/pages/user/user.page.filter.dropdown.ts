import { expect, Locator, Page } from '@playwright/test';

type MapValueFn = (raw: string) => string | null;

type FilterDropdownConfig = {
    selectButton: Locator;
    menu: Locator;
    closeButton: Locator;
    options: Locator;
    selectedOption: Locator;
    testIdPrefix: string;
    paramName: string;
    mapValue?: MapValueFn;
}

export class FilterDropdown {

    readonly page: Page;
    readonly selectButton: Locator;
    readonly menu: Locator;
    readonly closeButton: Locator;
    readonly options: Locator;
    readonly selectedOption: Locator;
    private readonly testIdPrefix: string;
    private readonly paramName: string;
    private readonly mapValue: MapValueFn;

    constructor(page: Page, config: FilterDropdownConfig) {
        this.page = page;
        this.selectButton = config.selectButton;
        this.menu = config.menu;
        this.closeButton = config.closeButton;
        this.options = config.options;
        this.selectedOption = config.selectedOption;
        this.testIdPrefix = config.testIdPrefix;
        this.paramName = config.paramName;
        this.mapValue = config.mapValue ?? ((v) => v);
    }

    async open() {
        if (await this.selectButton.getAttribute('aria-expanded') !== 'true') {
            await this.selectButton.click();
        }
        await expect(this.selectButton).toHaveAttribute('aria-expanded', 'true');
        await expect(this.menu).toHaveAttribute('aria-hidden', 'false');
    }

    async close() {
        await this.closeButton.click();
    }

    getOption(testId: string): Locator {
        return this.menu.getByTestId(testId);
    }

    async getOptionsTexts(): Promise<string[]> {
        return this.options.allTextContents();
    }

    async testAllOptions(expectParams: (expected: Record<string, string | null>) => Promise<void>) {
        const testIds = await this.options.evaluateAll((options) =>
            options.map((option) => option.getAttribute('data-testid')).filter((id): id is string => id !== null)
        );
        for (const testId of testIds) {
            await this.open();
            const option = this.getOption(testId);
            const raw = testId?.replace(this.testIdPrefix, '') ?? '';
            const paramValue = this.mapValue(raw);
            await option.click();
            await expectParams({ [this.paramName]: paramValue });
            await this.page.keyboard.press('Escape');
            await expect(this.menu).toHaveAttribute('aria-hidden', 'true');
        }
    }

}