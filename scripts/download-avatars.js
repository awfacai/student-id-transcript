// scripts/download-avatars.js
const fs = require("fs");
const path = require("path");
const https = require("https");

const baseUrl = "https://student.frp.gs/static/image/men";
const targetDir = path.resolve("public/avatars/men");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`Failed: ${url} (${response.statusCode})`);
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      reject(err.message);
    });
  });
}

async function main() {
  for (let i = 1; i <= 99; i++) {
    const url = `${baseUrl}/${i}.jpg`;
    const filepath = path.join(targetDir, `${i}.jpg`);
    if (!fs.existsSync(filepath)) {
      console.log(`Downloading ${url}...`);
      try {
        await downloadImage(url, filepath);
        console.log(`✅ Saved: ${filepath}`);
      } catch (err) {
        console.error(`❌ Error: ${err}`);
      }
    } else {
      console.log(`⚡ Skipped: ${filepath}`);
    }
  }
}

main();
