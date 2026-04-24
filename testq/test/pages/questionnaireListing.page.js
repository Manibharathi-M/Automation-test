const questionnaireLocators = require('../locators/questionnaireListing.locators');

class QuestionnaireListingPage {
  get questionnaireTable() { return $(questionnaireLocators.locators.questionnaireTable); }
  get nameColumnHeader() { return $(questionnaireLocators.locators.nameColumnHeader); }
  get clientNameColumnHeader() { return $(questionnaireLocators.locators.clientNameColumnHeader); }
  get statusColumnHeader() { return $(questionnaireLocators.locators.statusColumnHeader); }
  get noOfQuestionsColumnHeader() { return $(questionnaireLocators.locators.noOfQuestionsColumnHeader); }
  get processedTimeColumnHeader() { return $(questionnaireLocators.locators.processedTimeColumnHeader); }
  get createdTimeColumnHeader() { return $(questionnaireLocators.locators.createdTimeColumnHeader); }
  get firstQuestionnaireRow() { return $(questionnaireLocators.locators.firstQuestionnaireRow); }
  get firstQuestionnaireName() { return $(questionnaireLocators.locators.firstQuestionnaireName); }
  get firstClientName() { return $(questionnaireLocators.locators.firstClientName); }
  get firstStatus() { return $(questionnaireLocators.locators.firstStatus); }
  get firstNoOfQuestions() { return $(questionnaireLocators.locators.firstNoOfQuestions); }
  get firstProcessedTime() { return $(questionnaireLocators.locators.firstProcessedTime); }
  get firstCreatedTime() { return $(questionnaireLocators.locators.firstCreatedTime); }
  get searchBar() { return $(questionnaireLocators.locators.searchBar); }
  get statusFilterDropdown() { return $(questionnaireLocators.locators.statusFilterDropdown); }
  get noDataMessage() { return $(questionnaireLocators.locators.noDataMessage); }

  async open() {
    await browser.url("https://secq.augustahitech.com/home");
    await expect(this.questionnaireTable).toBeDisplayed();
  }

  async verifyColumnHeaders() {
    await expect(this.nameColumnHeader).toBeDisplayed();
    await expect(this.clientNameColumnHeader).toBeDisplayed();
    await expect(this.statusColumnHeader).toBeDisplayed();
    await expect(this.noOfQuestionsColumnHeader).toBeDisplayed();
    await expect(this.processedTimeColumnHeader).toBeDisplayed();
    await expect(this.createdTimeColumnHeader).toBeDisplayed();
  }

  async verifyTableIsVisible() {
    await expect(this.questionnaireTable).toBeDisplayed();
  }

  async verifyQuestionnaireEntryExists() {
    await expect(this.firstQuestionnaireRow).toBeDisplayed();
  }

  async verifyNameColumn() {
    const name = await this.firstQuestionnaireName.getText();
    await expect(name).not.toBeEmpty();
  }

  async verifyClientNameColumn() {
    const clientName = await this.firstClientName.getText();
    await expect(clientName).not.toBeEmpty();
  }

  async verifyStatusColumn() {
    const status = await this.firstStatus.getText();
    // Assuming 'Pending' and 'Completed' are the primary statuses. Add others as needed.
    await expect(['Pending', 'Completed', 'Processing', 'Failed']).toContain(status);
  }

  async verifyNoOfQuestionsColumn() {
    const noOfQuestions = await this.firstNoOfQuestions.getText();
    const parsedNo = parseInt(noOfQuestions, 10);
    await expect(parsedNo).toBeGreaterThanOrEqual(0);
    await expect(typeof parsedNo).toBe('number');
  }

  async verifyProcessedTimeColumn() {
    const processedTime = await this.firstProcessedTime.getText();
    // Basic check for date-time format. A more robust regex could be used if needed.
    await expect(processedTime).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2} [AP]M/);
  }

  async verifyCreatedTimeColumn() {
    const createdTime = await this.firstCreatedTime.getText();
    // Basic check for date-time format. A more robust regex could be used if needed.
    await expect(createdTime).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2} [AP]M/);
  }

  async filterByStatus(status) {
    await this.statusFilterDropdown.selectByVisibleText(status);
    // It might be beneficial to wait for the table to update after filtering.
    await browser.waitUntil(async () => {
        const currentStatus = await this.firstStatus.getText();
        return currentStatus === status || await this.noDataMessage.isDisplayed();
    }, {
        timeout: 5000,
        timeoutMsg: 'Failed to filter by status or no data found'
    });
  }

  async search(query) {
    await this.searchBar.setValue(query);
    // It might be beneficial to wait for the search results to update.
    await browser.waitUntil(async () => {
        const currentName = await this.firstQuestionnaireName.getText();
        return currentName.includes(query) || await this.noDataMessage.isDisplayed();
    }, {
        timeout: 5000,
        timeoutMsg: 'Failed to search or no data found for the query'
    });
  }
}

module.exports = new QuestionnaireListingPage();