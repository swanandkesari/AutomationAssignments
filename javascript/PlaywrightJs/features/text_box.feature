Feature: Text Box
  As a user
  I want to submit the Text Box form
  So that I can verify the data is processed correctly

  Scenario: Submit form with valid data
    Given I navigate to the "textBox" page
    When I fill the text box form with:
      | Full Name         | John Doe               |
      | Email             | john.doe@example.com   |
      | Current Address   | 123 Main St            |
      | Permanent Address | 456 Elm St             |
    And I click the submit button
    Then I should see the submitted data in the output