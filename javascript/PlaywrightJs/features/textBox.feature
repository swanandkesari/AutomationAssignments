Feature: Text Box

  As a user
  I want to fill and submit the text box form
  So that I can verify my details are correctly displayed

  Scenario: Successfully submit the text box form
    Given I am on the Text Box page
    When I fill the form with the following details:
      | Full Name        | Email                   | Current Address    | Permanent Address  |
      | Test User        | test.user@example.com   | 123 Test Street    | 456 Test Avenue    |
    And I submit the form
    Then I should see the submitted details displayed correctly