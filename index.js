const express = require("express");
const hndbrs = require("express-handlebars");
const app = express();
const User = require("./modules/User");
const conection = require("./dataBase/conection");

app.engine("handlebars", hndbrs.engine({defaultLayout: 'main'}));
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

app.get('/users', async (req, res) => {
  const users = await User.findAll({raw: true})
  console.log(users)

  res.render('users', {users})
})

app.get('/user/details/:id', async (req, res) => {
  const {id} = req.params;

  const user = await User.findOne({
    raw: true,
    where: {id: id}
  })

  res.render('userDetails', {user})
})

app.get('/user/update/:id', async (req, res) => {
  const {id} = req.params;

  const user = await User.findOne({
    where: {id: id},
    raw: true
  })

  res.render('userUpdate', {user})
})

app.post('/user/update/:id', async (req, res) => {
  let {Name, Salary, Ocupation, Newsletter} = req.body;
  const {id} = req.params;

  Newsletter === 'on' ? Newsletter = true : Newsletter = false;

  await User.update({Name, Ocupation, Salary, Newsletter}, {where: {id: id}})

  res.redirect('/users')
})

app.post('/user/delete/:id', async (req, res) => {
  const {id} = req.params;

  await User.destroy({where:{id:id}})
  res.redirect('/')
})

app.post('/user/create', async (req, res) => {
  let {Name, Ocupation, Salary, Newsletter} = req.body;
  Newsletter === 'on' ? Newsletter = true : Newsletter = false

  await User.create({Name,Ocupation,Salary,Newsletter})
  res.redirect('/users')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

