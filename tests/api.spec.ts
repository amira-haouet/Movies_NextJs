import { test, expect, Page } from '@playwright/test';

// Fonction de login
async function login(page: Page) {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'chayma@amira.com');
    await page.fill('input[type="password"]', '123456');
    await page.waitForTimeout(3000);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

  // Attendre que l'URL change après une connexion réussie
  await page.waitForURL('/dashboard/discover');
}

// Tests des API Movies et Shows
test.describe('API Tests for Movies and Shows', () => {
  test('should return at least 5 movies for now-playing', async ({ page }) => {
    await login(page); // Authentification

    // Faire l'appel API après connexion
    const [response] = await Promise.all([
      page.waitForResponse((resp) => resp.url().includes('/api/movies/now-playing') && resp.status() === 200),
      page.evaluate(() => fetch('/api/movies/now-playing')),
    ]);

    // Récupération des données
    const data = await response.json();

    // Assertions
    expect(response.status()).toBe(200);
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThanOrEqual(5);
  });

  test('should return at least 5 TV shows for on-the-air', async ({ page }) => {
    await login(page); // Authentification

    // Faire l'appel API après connexion
    const [response] = await Promise.all([
      page.waitForResponse((resp) => resp.url().includes('/api/shows/on-the-air') && resp.status() === 200),
      page.evaluate(() => fetch('/api/shows/on-the-air')),
    ]);

    // Récupération des données
    const data = await response.json();

    // Assertions
    expect(response.status()).toBe(200);
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThanOrEqual(5);
  });
});
