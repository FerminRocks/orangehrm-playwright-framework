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
}

export default LoginPage;
