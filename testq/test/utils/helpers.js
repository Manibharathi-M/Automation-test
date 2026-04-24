// test/utils/helpers.js
// Shared WDIO utility functions — import these in your page objects or specs.

/**
 * Wait for a URL to contain the given path segment.
 * @param {string} pathSegment
 * @param {number} [timeout=10000]
 */
async function waitForUrl(pathSegment, timeout = 10000) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(pathSegment),
    { timeout, timeoutMsg: `URL did not include "${pathSegment}" within ${timeout}ms` }
  );
}

/**
 * Wait for an element to disappear (e.g. loading spinner).
 * @param {string} selector
 * @param {number} [timeout=10000]
 */
async function waitForHidden(selector, timeout = 10000) {
  await $(selector).waitForDisplayed({ timeout, reverse: true });
}

/**
 * Scroll an element into view and click it.
 * @param {string} selector
 */
async function scrollAndClick(selector) {
  await $(selector).scrollIntoView();
  await $(selector).click();
}

/**
 * Clear a field and type new text.
 * @param {string} selector
 * @param {string} text
 */
async function clearAndType(selector, text) {
  await $(selector).waitForDisplayed({ timeout: 5000 });
  await $(selector).clearValue();
  await $(selector).setValue(text);
}

module.exports = { waitForUrl, waitForHidden, scrollAndClick, clearAndType };
