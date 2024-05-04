import { Builder, Browser, By, Key } from "selenium-webdriver";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // working like time.sleep

console.log("Trasnlete process start...");
export async function helloSelenium(arr) {
  console.log("Launch Browser and Open Google Translete Page");
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  await driver.get(
    "https://translate.google.com/?hl=tr&tab=TT&sl=tr&tl=en&op=translate"
  );

  const arrEn = [];
  for (let index = 0; index < arr.length; index++) {
    console.log(`${index + 1}. content translete...`);
    const sourceTransleteTextarea = await driver
      .findElement(
        By.xpath(
          "/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea"
        )
      )
      .sendKeys(arr[index]);
    await sleep(3000);
    const headerEn = driver
      .findElement(By.xpath("//span[@class='ryNqvb']"))
      .getText();
    // const transleteHeaerEn = turkishToEnglish(headerEn);
    arrEn.push(TrToEn((await headerEn).toString()));

    await sleep(3000);

    await driver.findElement(
      By.xpath(
        "/html/body/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[2]/c-wiz[1]/span/span/div/textarea"
      )
    );
    driver
      .actions()
      .keyDown(Key.CONTROL)
      .sendKeys("a")
      .keyUp(Key.CONTROL)
      .keyDown(Key.DELETE)
      .perform();

    await sleep(3000);
    console.log(`${index + 1}. content finish.`);
  }
  console.log(`Translete Finish`);
  await driver.quit();
}
const TrToEn = (text) => {
  return text
    .replaceAll("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
};
