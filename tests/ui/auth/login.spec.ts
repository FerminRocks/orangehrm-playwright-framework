import { test } from '@playwright/test';
import LoginPage from '../../../src/pages/LoginPage';
import DashboardPage from '../../../src/pages/DashboardPage';
import env from '../../../src/config/env';

test.describe('Authentication', () => {
  test('Successful login redirects authenticated user to Dashboard @smoke @functional-ui', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // Navigate to login
    await login.navigate();

    // Assert login controls visible
    await login.isDisplayed();

    // Perform login using environment-managed credentials
    await login.login(env.ORANGEHRM_USERNAME, env.ORANGEHRM_PASSWORD);

    // Assert dashboard visible
    await dashboard.isDisplayed();
  });
});
