import { Page, expect } from '@playwright/test';
import env from '../config/env';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardPath = '/web/index.php/dashboard/index';

  constructor(page: Page) {
    this.page = page;
  }

  async isDisplayed() {
    await expect(this.page).toHaveURL(new RegExp('/dashboard/index'));
    // Dashboard heading is a stable anchor per discovery
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }
}

export default DashboardPage;
