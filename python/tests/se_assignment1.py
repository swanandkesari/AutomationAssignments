from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

"""
Assignment 1: Selenium Automation for Crickinfo Best 50 Batters
Objective: filter out cricket players data from cricinfo website
    - Navigate to page : https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;template=results;type=batting
    - Store value and list out players data only if the avg is greater than **50**
"""
def test_crickinfo_best50batter():
    driver = webdriver.Chrome()
    driver.get("https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;template=results;type=batting")
    try:
        #//*[@id="ciHomeContentlhs"]/div[3]/table[3]
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//table[@class='engineTable'][caption[text()='Overall figures']]")))
        table = driver.find_element(By.XPATH, "//table[@class='engineTable'][caption[text()='Overall figures']]")  # Find the table element
        rows = table.find_elements(By.TAG_NAME, "tr")  # Find all the rows in the table
        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")  # Find all the cells in the row
            if len(cells) > 7:  # Check if the row has enough cells (to avoid header rows)
                avg = cells[7].text  # Assuming the average is in the 8th cell (index 7)
                try:
                    avg_value = float(avg)  # Convert average to a float
                    if avg_value > 50:  # Check if the average is greater than 50
                        player_name = cells[0].text  # Assuming the player name is in the 1st cell (index 0)
                        print(f"Name: {player_name}, Average: {avg_value}")
                except ValueError:
                    continue  # Skip rows where average is not a valid number
    finally:
        driver.quit()
if __name__ == "__main__":
    test_crickinfo_best50batter()
