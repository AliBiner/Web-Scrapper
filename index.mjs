import axios from "axios";
import cheerio from "cheerio";
import { helloSelenium } from "./selenium.mjs";

async function name() {
  let arr = [];
  let i = 1;
  for (let index = 6; index > 0; index--) {
    console.log(`${i}. url processing...`);

    const result = await axios.get(
      `https://www.bcekmece.bel.tr/devamedendetay?id=${index}`
    );

    const $ = cheerio.load(result.data);
    arr.push($("h2.font-weight-normal").text());

    arr.push(
      $("#b1e94155-d6ce-49c9-9ac8-3c140e8d63b7").find("p > span").text()
    );

    const img = $("#59958a43-a0f6-4c3f-8dc0-73dc4bd41dbe").find("img");
    const photo = img.attr("src") || "";

    if (photo) {
      request(photo).pipe(fs.createWriteStream(`./images/${index}.jpg`));
    }
    console.log(`${i}. url finish.`);
    i++;
  }
  console.log(`Informations sending to translete...`);
  helloSelenium(arr);
}

name();
