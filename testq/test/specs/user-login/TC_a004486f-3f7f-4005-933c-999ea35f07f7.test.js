const LoginPage = require('../../pages/login.page');

describe('User Login', () => {
  beforeEach(async () => {
    // Navigate to the login page URL
    // Using a placeholder for the base URL, ideally this would come from a config or environment variable
    await browser.url('https://secq.augustahitech.com/login');
  });

  afterEach(async () => {
    await browser.deleteCookies();
  });

  it('should display Email and Password input fields', async () => {
    // Assertion for the presence and display of the Email input field
    await expect(LoginPage.emailField).toExist();
    await expect(LoginPage.emailField).toBeDisplayed();

    // Assertion for the presence and display of the Password input field
    await expect(LoginPage.passwordField).toExist();
    await expect(LoginPage.passwordField).toBeDisplayed();

    // Optional: Check if fields are empty initially
    await expect(LoginPage.emailField).toHaveValue('');
    await expect(LoginPage.passwordField).toHaveValue('');
  });

  it('should login successfully with valid credentials and redirect to dashboard', async () => {
    // Replace with actual valid credentials from a secure source (e.g., environment variables, config file)
    const validUsername = 'ahsales.v2@augustasoftsol.com';
    const validPassword = 'Augusta@123#';

    await LoginPage.login(validUsername, validPassword);

    // Wait for the URL to change to the dashboard URL. Adjust the URL as needed.
    await browser.waitUntil(async () => {
      return await browser.getUrl() === 'https://secq.augustahitech.com/home';
    }, {
      timeout: 10000,
      timeoutMsg: 'Login failed: Did not redirect to dashboard within 10 seconds'
    });

    // Verify that the URL is the dashboard URL
    await expect(browser).toHaveUrl('https://secq.augustahitech.com/home');
  });

  it('should display an error message with invalid credentials', async () => {
    // Replace with actual invalid credentials
    const invalidUsername = 'invalid@example.com';
    const invalidPassword = 'wrongpassword';

    await LoginPage.login(invalidUsername, invalidPassword);

    // Add assertion for error message display. This requires the error message selector to be defined in locators.
    // For now, we'll assume the URL does not change to the dashboard, indicating a failed login.
    // If an error message selector is available, uncomment and adapt the following lines:
    // await expect(LoginPage.errorMessage).toBeDisplayed();
    // await expect(LoginPage.errorMessage).toHaveTextContaining('Invalid credentials'); // Adjust text as needed

    // Alternatively, check if the URL remains on the login page or a specific error page
    await expect(browser.getUrl()).toBe(browser.options.baseUrl + '/login'); // Adjust if error page has different URL
  });

  // Add more tests for email format validation, password complexity (if client-side validation is tested), etc.
  // For password complexity, client-side validation can be tricky to test reliably. Often, it's better tested server-side or through integration tests.
});
