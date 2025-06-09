const express = require("express");
const hndbrs = require("express-handlebars");
const app = express();
const User = require("./modules/User");
const conection = require("./dataBase/conection");

app.engine("handlebars", hndbrs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/user/create", (req, res) => {
  res.render("createUser");
});

app.post('/user/create', (req, res) => {
  let {ocupation, salary, newsletter} = req.body;
  newsletter === 'on' ? newsletter = true : newsletter = false

  User.create({ocupation,salary,newsletter})
  res.redirect('/')
})

try {
  conection.sync().then(() => {
    app.listen(3000);
  });
} catch (err) {
  console.log(err);
}
