import { test, expect } from '@playwright/test';

test('Hero section screenshot', async ({ page }) => {
  await page.goto('http://localhost:4173/AcademiaBoulder/');
  await expect(page.locator('section').first()).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/hero_section.png' });
});
