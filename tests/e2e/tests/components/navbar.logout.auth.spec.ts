import { expect, test } from '@e2e/fixtures/auth';
import { Navbar } from '@e2e/components';

test.describe('Navbar - logout user', () => {

    test('should log out the authenticated user from the options menu', async ({ isolatedAuthPage }) => {
        const navbar = new Navbar(isolatedAuthPage);
        await expect(navbar.root).toBeVisible();
        await navbar.choseOption(navbar.optionLogout);
        await expect(navbar.optionsButton).toBeHidden();
        await isolatedAuthPage.reload();
        await expect(navbar.optionsButton).toBeHidden();
    })

})