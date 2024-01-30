const fs = require("fs");
const path = require("path");
const express = require("express");
const { userScheme, idScheme } = require("./validation/scheme");
const { checkBody, checkParams } = require("./validation/validator");

const app = express();

let uniqueID = 1;
app.use(express.json());

const data = path.join(__dirname, "users.json");

app.get("/users", (req, res) => {
  res.send(fs.readFileSync(data));
});

app.get("/users/:id", checkParams(idScheme), (req, res) => {
  const users = JSON.parse(fs.readFileSync(data));
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.post("/users", checkBody(userScheme), (req, res) => {
  uniqueID += 1;
  const users = JSON.parse(fs.readFileSync(data));

  users.push({
    id: uniqueID,
    ...req.body,
  });

  fs.writeFileSync(data, JSON.stringify(users, null, 4));

  res.send(users[users.length - 1]);
});

app.put(
  "/users/:id",
  checkParams(idScheme),
  checkBody(userScheme),
  (req, res) => {
    const users = JSON.parse(fs.readFileSync(data));
    let user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.age = req.body.age;
      user.city = req.body.city;

      fs.writeFileSync(data, JSON.stringify(users, null, 4));
      res.send({ user });
    } else {
      res.status(404);
      res.send({ user: null });
    }
  }
);

app.delete("/users/:id", checkParams(idScheme), (req, res) => {
  const users = JSON.parse(fs.readFileSync(data));
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFileSync(data, JSON.stringify(users, null, 4));

    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

// Обработка несуществующих роутов
app.use((req, res) => {
  res.status(404).send({ message: "URL not found!" });
});

app.listen(3000);
