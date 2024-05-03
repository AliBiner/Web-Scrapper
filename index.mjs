// const axios = require("axios");
import axios from "axios";
import cheerio from "cheerio";
import { exec } from "child_process";
import fs from "fs";
import request from "request";

async function name() {
  let array = [];
  for (let index = 6; index > 0; index--) {
    const result = await axios.get(
      `https://www.bcekmece.bel.tr/devamedendetay?id=${index}`
    );

    const $ = cheerio.load(result.data);
    array.push($("h2.font-weight-normal").text());

    array.push(
      $("#b1e94155-d6ce-49c9-9ac8-3c140e8d63b7").find("p > span").text()
    );

    const img = $("#59958a43-a0f6-4c3f-8dc0-73dc4bd41dbe").find("img");
    const photo = img.attr("src") || "";

    if (photo) {
      request(photo).pipe(fs.createWriteStream(`./images/${index}.jpg`));
    }
  }
  fs.writeFile("./test.txt", array.join("\n\n\n"), (err) => {
    if (err) throw err;
  });
  console.log(array);
  python(array);
}
function python(params) {
  const pythonProcess = exec(
    "python3 cpTranslete.py",
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Hata oluştu: ${err.message}`);
        return;
      }
      if (stderr) {
        console.error(`Hata çıktısı: ${stderr}`);
        return;
      }
      const processedResult = JSON.parse(stdout);
      console.log("İşlenmiş sonuç:", processedResult);
    }
  );
  const jsonArray = JSON.stringify(params);
  pythonProcess.stdin.write(jsonArray);
  pythonProcess.stdin.end();
}

name();
