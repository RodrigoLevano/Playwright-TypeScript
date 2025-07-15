import {test, expect} from '@playwright/test';

test('Hacer un mock de una fruta que no viene de la API real', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{name: 'Melocotón', id: 26}];
        await route.fulfill({json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Melocotón')).toBeVisible();
})

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Lionel Messi', id:200})

        await route.fulfill({ response, json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Lionel Messi', {exact:true})).toBeVisible();
})
