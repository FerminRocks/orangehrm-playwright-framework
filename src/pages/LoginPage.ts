import { Page, expect } from '@playwright/test';
import env from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly loginPath = '/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(`${env.ORANGEHRM_BASE_URL}${this.loginPath}`);
  }

  async isDisplayed() {
    await expect(this.page).toHaveURL(new RegExp('/auth/login'));
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    await expect(this.page.getByPlaceholder('Password')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Submit credentials without waiting for a full network idle state.
  // Useful for negative tests where client-side validation may prevent navigation.
  async submitCredentials(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  // Assertions for negative scenarios
  async expectInvalidCredentialsError() {
    const alert = this.page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
    // Ensure still on login page
    await expect(this.page).toHaveURL(new RegExp('/auth/login'));
  }

  async expectUsernameRequiredMessage() {
    const locator = this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.getByPlaceholder('Username') })
      .getByText('Required', { exact: true });
    await expect(locator).toBeVisible();
    await expect(this.page).toHaveURL(new RegExp('/auth/login'));
  }

  async expectPasswordRequiredMessage() {
    const locator = this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.getByPlaceholder('Password') })
      .getByText('Required', { exact: true });
    await expect(locator).toBeVisible();
    await expect(this.page).toHaveURL(new RegExp('/auth/login'));
  }
}

export default LoginPage;
