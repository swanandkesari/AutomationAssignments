//@ts-js
import { test, expect } from '@playwright/test';

/*
* Assignment 1: Automation for Crickinfo Best 50 Batters
* Objective: filter out cricket players data from cricinfo website
    - Navigate to page : https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;template=results;type=batting
    - Store value and list out players data only if the avg is greater than **50**
*/
test('Test Case 1:filter players with batting average greater than 50', async ({ page }) => {
    await page.goto("https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;template=results;type=batting");

    //const table= await page.locator('.engineTable').nth(2);
    const table = await page.locator("//table[@class='engineTable'][caption[text()='Overall figures']]")

    const rows = table.locator('tbody tr');
    const playerData = [];
    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const cells = row.locator('td');
        if (await cells.count() > 7) {
            const avg = await cells.nth(7).innerText();
            if (parseFloat(avg) > 50) {
                const playerName = await cells.nth(0).innerText();
                playerData.push({ name: playerName, average: avg });
            }
        }
    }
    console.log(playerData);
});