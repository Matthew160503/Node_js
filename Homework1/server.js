const http = require("http");

let countHomePage = 0;
let countAboutPage = 0;

const server = http.createServer((req, res) => {
  console.log("Запрос получен");
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Корневая страница</h1>
            <p>Просмотры: ${++countHomePage}</p>
            <a href="http://localhost:3000/about">Страница about</a>`);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Страница About</h1>
            <p>Просмотры: ${++countAboutPage}</p>
            <a href="http://localhost:3000">Главная страница</a>`);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end("<h1>Страница не найдена!</h1>");
  }
});

const PORT = 3000;
const HOST = "localhost";

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
