// @tag:android

const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "username";

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "accessKey";

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  "app": process.env.LT_APP_URL, // Enter the 'app_url' here.
  "build": "Proverbial Test",
  "name": `Galaxy S25 - 15 | Exploring options`,
  "deviceName": "Galaxy S25",
  "platformName": "android",
  "platformVersion": "15",
  "visual": true,
	"network": true,
	"video": true,
	"isRealMobile": true,
	"console": true,
  "accessibility": true,
  "devicelog": true,
  "autoGrantPermissions": true,
  // "enableBiometricsAuthentication": true,
  // "enableBluetooth": true,
  "appProfiling": true,
  "advancedProfiling": true
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

const DEFAULT_TIMEOUT = 10000;
async function runAndroidTests(){  
  const startTime = Date.now();

  try {
    await driver.init(desiredCapabilities)

    const colorButton = await driver.waitForElementById("color", DEFAULT_TIMEOUT);
    await colorButton.click();

    const textButton = await driver.waitForElementById("Text", DEFAULT_TIMEOUT);
    await textButton.click();

    const toastButton = await driver.waitForElementById("toast", DEFAULT_TIMEOUT);
    await toastButton.click();

    const notificationButton = await driver.waitForElementById("notification", DEFAULT_TIMEOUT);
    await notificationButton.click();

    const geoLocationButton = await driver.waitForElementById("geoLocation", DEFAULT_TIMEOUT);
    await geoLocationButton.click();

    await driver.execute("lambda-accessibility-scan")

    const speedTestButton = await driver.waitForElementById("buttonPage", DEFAULT_TIMEOUT);
    await speedTestButton.click();

    const webviewButton = await driver.waitForElementById("webview", DEFAULT_TIMEOUT);
    await webviewButton.click();

    const urlInputField = await driver.waitForElementById("url", DEFAULT_TIMEOUT);
    await urlInputField.click();
    await urlInputField.type("https://www.lambdatest.com");

    await driver.execute("lambda-accessibility-scan")

    const findButton = await driver.waitForElementById("find", DEFAULT_TIMEOUT);
    await findButton.click();

    await driver.execute(
      `lambda-hook: {"action":"setTestStatus","arguments":{"status":"passed","remark":"All steps completed!"}}`
    );
      
  } catch (e) {
      await driver.execute(
        `lambda-hook: {"action":"setTestStatus","arguments":{"status":"failed","remark":"${e.message || e}"}}`
      );
      await driver.quit();
  } finally {
      const duration = (Date.now() - startTime) / 1000;
      await driver.quit();
  }
}

