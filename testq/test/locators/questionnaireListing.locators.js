const locators = {
  questionnaireTable: "table",
  nameColumnHeader: "th:contains('Name')",
  clientNameColumnHeader: "th:contains('Client Name')",
  statusColumnHeader: "th:contains('Status')",
  noOfQuestionsColumnHeader: "th:contains('No. of Questions')",
  processedTimeColumnHeader: "th:contains('Processed Time')",
  createdTimeColumnHeader: "th:contains('Created Time')",
  firstQuestionnaireRow: "tbody tr:first",
  firstQuestionnaireName: "tbody tr:first td:first",
  firstClientName: "tbody tr:first td:nth-child(2)",
  firstStatus: "tbody tr:first td:nth-child(3)",
  firstNoOfQuestions: "tbody tr:first td:nth-child(4)",
  firstProcessedTime: "tbody tr:first td:nth-child(5)",
  firstCreatedTime: "tbody tr:first td:nth-child(6)",
  searchBar: "input[placeholder*='Search']",
  statusFilterDropdown: "select[id='status-filter']",
  statusFilterAllOption: "select[id='status-filter'] option[value='all']",
  statusFilterPendingOption: "select[id='status-filter'] option[value='pending']",
  statusFilterProcessingOption: "select[id='status-filter'] option[value='processing']",
  statusFilterCompletedOption: "select[id='status-filter'] option[value='completed']",
  statusFilterFailedOption: "select[id='status-filter'] option[value='failed']",
  noDataMessage: "div.no-data-message"
};

module.exports = { locators };