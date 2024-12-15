import { test, expect, Page } from '@playwright/test';

// Fonction utilitaire pour se connecter
async function login(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'chayma@amira.com');
  await page.fill('input[type="password"]', '123456');
  await page.waitForTimeout(3000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.waitForURL('/dashboard/discover'); // Vérifie que la redirection fonctionne
}

test.describe('GridMovie and GridTVShow Components', () => {
  test('should display movie titles, overviews, and ratings correctly', async ({ page }) => {
    await login(page); // Authentification

    await page.goto('/dashboard/movies/popular'); // Accéder à la page protégée

    const movieCards = page.locator('div[data-testid="movie-card"]');

    const firstMovieTitle = movieCards.nth(0).locator('h2');
    await expect(firstMovieTitle).toBeVisible();

    const firstMovieOverview = movieCards.nth(0).locator('p');
    await expect(firstMovieOverview).toBeVisible();
  });

  test('should display TV show names, overviews, and ratings correctly', async ({ page }) => {
    await login(page); // Authentification

    await page.goto('/dashboard/shows/popular'); // Accéder à la page protégée

    const showCards = page.locator('div[data-testid="show-card"]');

    const firstShowTitle = showCards.nth(0).locator('h2');
    await expect(firstShowTitle).toBeVisible();

    const firstShowOverview = showCards.nth(0).locator('p');
    await expect(firstShowOverview).toBeVisible();
  });
});
