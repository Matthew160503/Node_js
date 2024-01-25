const express = require("express");
const path = require("path");
const fs = require("fs");

function writeToFile(filePath, obj) {
  fs.writeFile(filePath, JSON.stringify(obj, null, 4), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was rewritten");
    }
  });
}

const app = express();

const pathToCountFile = path.join(__dirname, "count.json");

const countObject = JSON.parse(fs.readFileSync(pathToCountFile, "utf-8"));

app.get("/", (req, res) => {
  countObject["index"] += 1;
  res.send(`<h1>Главная страница</h1>
  <p>Просмотров: ${countObject["index"]}</p>
  <a href="/about">Ссылка на страницу About</a>`);
  writeToFile(pathToCountFile, countObject);
});

app.get("/about", (req, res) => {
  countObject["about"] += 1;
  res.send(`<h1>Страница About</h1>
  <p>Просмотров: ${countObject["about"]}</p>
  <a href="/">Ссылка на главную страницу</a>`);
  writeToFile(pathToCountFile, countObject);
});

app.listen(3000);
