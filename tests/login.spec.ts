import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should render the login page with form fields', async ({ page }) => {
    await page.goto('/'); 

    // Vérifie que le formulaire de connexion s'affiche
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Vérifie le texte du bouton
    await expect(page.locator('button[type="submit"]')).toHaveText('Se connecter');
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/');
  
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.waitForTimeout(3000);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    const toast = page.locator('text="Oups ! Une erreur est survenue."');
    await expect(toast).toBeVisible();
  });
  

  test('should redirect to dashboard on valid login', async ({ page }) => {
    await page.goto('/login');

    // Remplir l'email et le mot de passe avant de cliquer
    await page.fill('input[type="email"]', 'chayma@amira.com');
    await page.fill('input[type="password"]', '123456');
    await page.waitForTimeout(3000);

    await page.click('button[type="submit"]');

    // Vérifiez que l'utilisateur est redirigé vers le tableau de bord
    await page.waitForTimeout(3000);
    await page.waitForURL('/dashboard/discover'); // Vérifie que la redirection fonctionne
    });
});
