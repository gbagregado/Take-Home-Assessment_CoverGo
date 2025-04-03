# UI Automation Assessment

This project contains automated UI tests for the [Sauce Demo](https://www.saucedemo.com/) website using the Playwright framework. The tests cover various functionalities such as login, product interactions, cart operations, and checkout.

---

## **Table of Contents**
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Test Cases](#test-cases)
- [Folder Structure](#folder-structure)
- [Additional Commands](#additional-commands)
- [Example Test Code](#example-test-code)
- [Documentation](#documentation)

---

## **Prerequisites**
1. **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. **Playwright**: This project uses Playwright for browser automation.

---

## **Installation**
Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd uiautomationassessment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## **Running the Tests**
To execute the tests, use the following commands:

1. Run all tests:
   ```bash
   npx playwright test
   ```

2. Run a specific test file:
   ```bash
   npx playwright test tests/uitest.spec.ts
   ```

3. Run tests in headed mode (with a browser window):
   ```bash
   npx playwright test --headed
   ```

4. View the test report:
   ```bash
   npx playwright show-report
   ```

---

## **Test Cases**
The following test cases are implemented in the `uitest.spec.ts` file:

1. **Verify login functionality with valid credentials**:
   - Logs in with valid credentials and verifies the "Products" page is displayed.

2. **Verify login fails with invalid credentials**:
   - Attempts to log in with invalid credentials and verifies the error message.

3. **Verify product list is displayed after login**:
   - Logs in and verifies that the product list is displayed.

4. **Verify adding a product to the cart**:
   - Adds a product to the cart and verifies the cart badge updates.

5. **Verify removing a product from the cart**:
   - Adds and removes a product from the cart, verifying the cart badge is cleared.

6. **Verify cart page displays added products**:
   - Adds a product to the cart and verifies it appears on the cart page.

7. **Verify sorting products by price (low to high)**:
   - Sorts products by price (low to high) and verifies the first product's price.

8. **Verify product details page displays correct information**:
   - Opens a product details page and verifies the product name and price.

9. **Verify checkout process completes successfully**:
   - Completes the checkout process and verifies the confirmation message.

10. **Verify logout functionality**:
    - Logs out and verifies the user is redirected to the login page.

---

## **Folder Structure**
The project structure is as follows:
```
uiautomationassessment/
├── tests/
│   └── uitest.spec.ts   # Contains all the test cases
├── playwright.config.ts  # Playwright configuration file
├── package.json          # Node.js project metadata
├── package-lock.json     # Dependency lock file
```

---

## **Additional Commands**
- Run tests in debug mode:
  ```bash
  npx playwright test --debug
  ```

- Run tests with a specific browser (e.g., Chrome):
  ```bash
  npx playwright test --project=chromium
  ```

- Update Playwright browsers:
  ```bash
  npx playwright install
  ```

---

## **Example Test Code**
Below is an excerpt of the test cases implemented in `uitest.spec.ts`:

```typescript
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
```
