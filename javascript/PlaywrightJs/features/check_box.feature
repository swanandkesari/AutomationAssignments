Feature: Checkbox Selection
  As a user
  I want to select checkboxes
  So that I can choose multiple options

  Scenario: Navigate to checkbox page
    Given I navigate to the "checkBox" page
    Then I should be on "checkbox"

  Scenario: Expand all checkboxes
    Given I navigate to the "checkBox" page
    When I expand all checkboxes
    Then I take a screenshot
