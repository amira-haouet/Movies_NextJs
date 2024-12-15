import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'chayma@amira.com');
  await page.fill('input[type="password"]', '123456');
  await page.waitForTimeout(3000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.waitForURL('/dashboard/discover');
}

test.describe('ShowDetailsPage', () => {
  test('should display a poster, title, and rating for a TV show', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/shows/252373'); 

    // Vérifiez que le poster est visible
    const poster = page.locator('[data-testid="show-poster"]');
    await expect(poster).toBeVisible();

    // Vérifiez que le titre est affiché
    const title = page.locator('[data-testid="show-title"]');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();

    // Vérifiez que le rating est affiché
    const rating = page.locator('[data-testid="show-rating"]');
    await expect(rating).toBeVisible();
    const ratingText = await rating.innerText();
    expect(parseFloat(ratingText.split('/')[0])).toBeLessThanOrEqual(10); // Vérifie que le rating est ≤ 10
  });
});

test.describe('MovieDetailsPage', () => {
  test('should display a poster, title, and rating for a movie', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/movies/912649'); 

    // Vérifiez que le poster est visible
    const poster = page.locator('[data-testid="movie-poster"]');
    await expect(poster).toBeVisible();

    // Vérifiez que le titre est affiché
    const title = page.locator('[data-testid="movie-title"]');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();

    // Vérifiez que le rating est affiché
    const rating = page.locator('[data-testid="movie-rating"]');
    await expect(rating).toBeVisible();
    const ratingText = await rating.innerText();
    expect(parseFloat(ratingText.split('/')[0])).toBeLessThanOrEqual(10); // Vérifie que le rating est ≤ 10
  });
});
