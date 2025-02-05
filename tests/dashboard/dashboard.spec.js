const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const { LoginPage } = require("../../pageObjects/login.po");
const { DashboardPage } = require("../../pageObjects/dashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await page.waitForTimeout(3000);
//   await login.verifyValidLogin();
});

test.describe("Dashboard CRUD", () => {
  test("AddToCart CRUD", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.addToCart("View Cart");
    await dashboard.removeQuantity();
  });

  test("Multiple Add", async ({ page }) => {
    const multipleAdd = new DashboardPage(page);
    await multipleAdd.addMultipleItem();
  });
});

test.describe("Search Operation", () => {
  test.only("Search Items", async ({ page }) => {
    const search = new DashboardPage(page);
    await search.searchOperation("ROLLY Earbuds");
  });
});