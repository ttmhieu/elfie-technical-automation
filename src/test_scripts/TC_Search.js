import { remote } from "webdriverio";
import { expect } from "chai";

import GoogleSearchPage from "../page_objects/google/SearchPage";
import SearchResultsPage from "../page_objects/google/ReultPage";

import ElfiePage from "../page_objects/elfie";

import allureReporter from "@wdio/allure-reporter";
import testData from "../test_data/TC_Search.json";

describe("Google Search Automation", () => {
  let client;

  before(async () => {
    client = await remote({
      capabilities: {
        platformName: "Android",
        appPackage: "com.android.chrome",
        browserName: "Chrome",
        appActivity: "com.google.android.apps.chrome.Main",
        "appium:deviceName": "nightwatch-android-11",
        "appium:udid": "emulator-5554",
        "appium:platformVersion": "11.0",
        "appium:automationName": "UiAutomator2",
        "appium:app": join(
          process.cwd(),
          "apps/android.wdio.native.app.v1.0.8.apk"
        ),
        browserName: "Chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-extensions"],
        },
        chromeVersion: "83.0.4103",
      },
      path: "/wd/hub",
      logLevel: "info",
    });
  });

  after(async () => {
    await client.deleteSession();
  });

  testData.forEach((data, index) => {
    it(`Test Case ${index + 1}: Search for "${
      data.searchKeyword
    }" and verify elements on Elfie page`, async () => {
      const googleSearchPage = new GoogleSearchPage(client);
      const searchResultsPage = new SearchResultsPage(client);
      const elfiePage = new ElfiePage(client);

      allure.feature("Google Search");
      allure.story("Elfie Page");
      allure.label("severity", "critical");
      allure.description(
        `Test Case ${index + 1}: Search for "${
          data.searchKeyword
        }" and verify elements on Elfie page`
      );

      await client.url("https://www.google.com/");
      await googleSearchPage.search(data.searchKeyword);
      await searchResultsPage.clickFirstResult();

      allure.step(
        "Verify the Logo should be displayed and capture image at this step.",
        async () => {
          const isLogoDisplayed = await elfiePage.isLogoDisplayed();
          expect(isLogoDisplayed).to.equal(data.expectedLogoDisplayed);
          await elfiePage.captureScreenshot(`logo_verification_${index + 1}`);
        }
      );

      allure.step(
        'Click on Hamburger menu and verify that "hamburger" menu changes to "X" button',
        async () => {
          await elfiePage.clickHamburgerMenu();
          const isXButtonDisplayed = await elfiePage.isXButtonDisplayed();
          expect(isXButtonDisplayed).to.equal(data.expectedXButtonDisplayed);
          await elfiePage.captureScreenshot(
            `x_button_verification_${index + 1}`
          );
        }
      );

      allure.step(
        'Scroll into the bottom and verify the text "Copyright 2023 Elfie Pte. Ltd."',
        async () => {
          await elfiePage.scrollDown();
          const isCopyrightTextDisplayed =
            await elfiePage.isCopyrightTextDisplayed();
          expect(isCopyrightTextDisplayed).to.equal(
            data.expectedCopyrightTextDisplayed
          );
          await elfiePage.captureScreenshot(
            `copyright_text_verification_${index + 1}`
          );
          await elfiePage.checkElementScreenshot(
            elfiePage.copyrightText,
            `copyright_text_comparison_${index + 1}`
          );
        }
      );
    });
  });
});
