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

test.describe('Discover Page', () => {
  test('should display both movies and TV shows sections', async ({ page }) => {
    await login(page); 
    // Naviguer vers la page Discover
    await page.goto('/dashboard/discover');
    await page.waitForTimeout(3000);

    // Vérifier que le titre pour les films existe
    const moviesSectionTitle = page.locator('h1', { hasText: 'Films Découvertes' });
    await expect(moviesSectionTitle).toBeVisible();

    // Vérifier que la section des films contient au moins un élément
    const movieCards = page.locator('[data-testid="movie-card"]');
    const movieCardsCount = await movieCards.count();
    await expect(movieCardsCount).toBeGreaterThan(0);

    // Vérifier que le titre pour les séries existe
    const tvShowsSectionTitle = page.locator('h1', { hasText: 'Séries Découvertes' });
    await expect(tvShowsSectionTitle).toBeVisible();

    // Vérifier que la section des séries contient au moins un élément
    const tvShowCards = page.locator('[data-testid="show-card"]');
    const tvShowCardsCount = await tvShowCards.count();
    await expect(tvShowCardsCount).toBeGreaterThan(0);
  });
});
