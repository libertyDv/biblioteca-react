// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/'

test('should find h3 and check its text', async ({ page }) => {
  await page.goto(LOCALHOST_URL); // Cambia esto a la URL de tu aplicación
  
  // Encuentra el h3
  const heading = await page.getByRole('heading', { level: 3, name: 'Harry Potter and the Sorcerer\'s Stone' });
  const text = await heading.textContent();
  expect(text).toBe('Harry Potter and the Sorcerer\'s Stone');
  
});