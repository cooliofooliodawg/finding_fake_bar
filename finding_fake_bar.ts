import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Open the website
  await page.goto('http://sdetchallenge.fetch.com/');

  // Helper function to perform a weighing
  const performWeighing = async (leftBars: number[], rightBars: number[]): Promise<string> => {
    // Clear the scales by clicking the reset button
    const grabElements = await page.$$('#reset');
    await grabElements[1].click();

    // Fill the left bowl
    for (let i = 0; i < leftBars.length; i++) {
      await page.type(`#left_${i}`, leftBars[i].toString());
    }

    // Fill the right bowl
    for (let i = 0; i < rightBars.length; i++) {
      await page.type(`#right_${i}`, rightBars[i].toString());
    }

    // Perform the weighing
    await page.click('#weigh');
    await page.waitForTimeout(4000);  // Wait for the result to be displayed

    // Get the result from the disabled reset button
    const result = await page.$eval('#reset:disabled', el => el.textContent);
    return result as string;
  };

  // Helper function to click on the fake bar button and check the result
  const clickFakeBarButton = async (bar: number): Promise<string> => {
    let alertText = '';

    page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    await page.click(`#coin_${bar}`);
    await page.waitForTimeout(1000);  // Wait for the alert

    return alertText;
  };

  // Algorithm to find the fake bar
  const findFakeBar = async (): Promise<[number, [number[], number[], string][]]> => {
    const weighings: [number[], number[], string][] = [];

    // First weighing: compare bars 0-2 against 3-5
    let result = await performWeighing([0, 1, 2], [3, 4, 5]);
    weighings.push([[0, 1, 2], [3, 4, 5], result]);

    let suspectBars: number[];
    if (result === '<') {
      suspectBars = [0, 1, 2];
    } else if (result === '>') {
      suspectBars = [3, 4, 5];
    } else {
      suspectBars = [6, 7, 8];
    }

    // Second weighing: compare two bars from the suspect group
    result = await performWeighing(suspectBars.slice(0, 2), [suspectBars[2]]);
    weighings.push([suspectBars.slice(0, 2), [suspectBars[2]], result]);

    let fakeBar: number;
    if (result === '<') {
      fakeBar = suspectBars[0];
    } else if (result === '>') {
      fakeBar = suspectBars[2];
    } else {
      fakeBar = suspectBars[1];
    }

    return [fakeBar, weighings];
  };

  // Find the fake bar and get the weighings list
  const [fakeBar, weighings] = await findFakeBar();

  // Click the fake bar button and get the result
  const resultMessage = await clickFakeBarButton(fakeBar);

  // Print the results
  console.log(`Fake bar: ${fakeBar}`);
  console.log(`Result: ${resultMessage}`);
  console.log('Weighings:');
  for (const [left, right, result] of weighings) {
    console.log(`${left} vs ${right} -> ${result}`);
  }

  // Close the browser
  await browser.close();
})();
