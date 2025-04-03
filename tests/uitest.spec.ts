import { test, expect } from '@playwright/test';

test.describe('UI Tests for Sauce Demo', () => {
  test('Verify login functionality with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const productsTitle = await page.textContent('.title');
    expect(productsTitle).toBe('Products');
  });

  test('Verify login fails with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');
    const errorMessage = await page.textContent('[data-test="error"]');
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Verify product list is displayed after login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const productItems = await page.$$('.inventory_item');
    expect(productItems.length).toBeGreaterThan(0);
  });

  test('Verify adding a product to the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.textContent('.shopping_cart_badge');
    expect(cartBadge).toBe('1');
  });

  test('Verify removing a product from the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('button[data-test="remove-sauce-labs-backpack"]');
    const cartBadge = await page.$('.shopping_cart_badge');
    expect(cartBadge).toBeNull();
  });

  test('Verify cart page displays added products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    const cartItem = await page.textContent('.inventory_item_name');
    expect(cartItem).toBe('Sauce Labs Backpack');
  });

  test('Verify sorting products by price (low to high)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.selectOption('.product_sort_container', 'lohi');
    const firstProductPrice = await page.textContent('.inventory_item_price');
    expect(firstProductPrice).toBe('$7.99'); // Assuming the lowest price is $7.99
  });

  test('Verify product details page displays correct information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item_name:has-text("Sauce Labs Backpack")');
    const productTitle = await page.textContent('.inventory_details_name');
    const productPrice = await page.textContent('.inventory_details_price');
    expect(productTitle).toBe('Sauce Labs Backpack');
    expect(productPrice).toBe('$29.99'); // Assuming the price is $29.99
  });

  test('Verify checkout process completes successfully', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    const confirmationMessage = await page.textContent('.complete-header');
    expect(confirmationMessage).toBe('Thank you for your order!');
  });

  test('Verify logout functionality', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    const loginButton = await page.$('#login-button');
    expect(loginButton).not.toBeNull();
  });
});