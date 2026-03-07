Feature: Website Menu Validation

  Scenario: Verify menu options count
    Given I navigate to the "home" page
    Then I should see 6 options in the menu
    And I take a screenshot
