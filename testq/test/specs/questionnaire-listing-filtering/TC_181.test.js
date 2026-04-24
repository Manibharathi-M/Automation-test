const QuestionnaireListingPage = require('../../pages/questionnaireListing.page');

describe('TC_181: Verify questionnaire table displays all processed questionnaires with correct columns populated upon initial page load.', () => {
  before(async () => {
    // Navigate to the questionnaire listing page
    await QuestionnaireListingPage.open();
  });

  it('should display the questionnaire table with correct columns and populated data', async () => {
    // Step 2: Observe the displayed questionnaire table.
    await QuestionnaireListingPage.verifyTableIsVisible();

    // Step 3: Verify the table column headers are present.
    await QuestionnaireListingPage.verifyColumnHeaders();

    // Step 4: Check if any processed questionnaires are listed.
    // This assertion will pass if there's at least one row, or if no data message is displayed.
    // If a specific message for no data is expected, it should be asserted here.
    try {
      await QuestionnaireListingPage.verifyQuestionnaireEntryExists();
      
      // Step 5: Examine the data in the 'Name' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyNameColumn();

      // Step 6: Examine the data in the 'Client Name' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyClientNameColumn();

      // Step 7: Examine the data in the 'Status' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyStatusColumn();

      // Step 8: Examine the data in the 'No. of Questions' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyNoOfQuestionsColumn();

      // Step 9: Examine the data in the 'Processed Time' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyProcessedTimeColumn();

      // Step 10: Examine the data in the 'Created Time' column for a listed questionnaire.
      await QuestionnaireListingPage.verifyCreatedTimeColumn();

    } catch (error) {
      // If verifyQuestionnaireEntryExists fails, it means there are no entries.
      // In this case, we can check for a 'no data' message if one exists.
      // For now, we'll log the error and assume the test should fail if no entries are expected.
      console.log('No questionnaire entries found. Error:', error.message);
      // Optionally, assert that a no-data message is displayed if that's the expected behavior when empty.
      // await expect(QuestionnaireListingPage.noDataMessage).toBeDisplayed();
      throw error; // Re-throw to fail the test if entries were expected
    }
  });

  after(async () => {
    await browser.deleteCookies();
  });
});