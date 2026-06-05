import { test } from '@playwright/test';
import LoginPage from '../../../src/pages/LoginPage';
import env from '../../../src/config/env';

test.describe('Negative Authentication', () => {
  test('Invalid credentials displays authentication error @functional-ui @negative', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.isDisplayed();

    // Use clearly fake credentials
    await login.submitCredentials('InvalidUser', 'InvalidPassword123');

    await login.expectInvalidCredentialsError();
  });

  test('Empty username displays username required validation @functional-ui @negative', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.isDisplayed();

    // Leave username empty and enter valid password from env
    await login.submitCredentials('', env.ORANGEHRM_PASSWORD);

    await login.expectUsernameRequiredMessage();
  });

  test('Empty password displays password required validation @functional-ui @negative', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.isDisplayed();

    // Enter valid username from env and leave password empty
    await login.submitCredentials(env.ORANGEHRM_USERNAME, '');

    await login.expectPasswordRequiredMessage();
  });
});
