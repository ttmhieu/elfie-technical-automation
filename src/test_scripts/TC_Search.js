import { remote } from "webdriverio";
import { expect } from "chai";

import GoogleSearchPage from "../page_objects/google/SearchPage";
import SearchResultsPage from "../page_objects/google/ReultPage";

import ElfiePage from "../page_objects/elfie";

describe("Google Search Automation", () => {
  let client;

  before(async () => {
    client = await remote({
      capabilities: {
        platformName: "Android",
        appPackage: "com.android.chrome",
        appActivity: "com.google.android.apps.chrome.Main",
        automationName: "UiAutomator2",
        deviceName: "emulator-5554",
      },
      path: "/wd/hub",
      logLevel: "info",
    });
  });

  after(async () => {
    await client.deleteSession();
  });

  it("should search for Elfie and verify elements on Elfie page", async () => {
    const googleSearchPage = new GoogleSearchPage(client);
    const searchResultsPage = new SearchResultsPage(client);
    const elfiePage = new ElfiePage(client);

    await client.url("https://www.google.com/");
    await googleSearchPage.search("Elfie");
    await searchResultsPage.clickFirstResult();

    // 4.1. Verify the Logo should be displayed and capture image at this step.
    const isLogoDisplayed = await elfiePage.isLogoDisplayed();
    expect(isLogoDisplayed).to.be.true;

    await elfiePage.captureScreenshot("logo_verification");

    // 4.2. Click on Hamburger menu
    await elfiePage.clickHamburgerMenu();

    // Verify that "hamburger" menu changes to "X" button
    const isXButtonDisplayed = await elfiePage.isXButtonDisplayed();
    expect(isXButtonDisplayed).to.be.true;

    await elfiePage.captureScreenshot("x_button_verification");

    // 4.3. Scroll into the bottom
    await elfiePage.scrollDown();

    // Verify the text "Copyright 2023 Elfie Pte. Ltd."
    const isCopyrightTextDisplayed = await elfiePage.isCopyrightTextDisplayed();
    expect(isCopyrightTextDisplayed).to.be.true;

    await elfiePage.captureScreenshot("copyright_text_verification");
    await elfiePage.checkElementScreenshot(
      elfiePage.copyrightText,
      "copyright_text_comparison"
    );
  });
});
