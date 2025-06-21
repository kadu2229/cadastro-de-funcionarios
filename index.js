require('dotenv').config(); // Carrega variáveis do Railway

const express = require("express");
const hndbrs = require("express-handlebars");
const app = express();
const User = require("./modules/User");
const conection = require('./dataBase/conection');

// Configurações do Handlebars
app.engine("handlebars", hndbrs.engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/user/create", (req, res) => {
  res.render("createUser");
});

app.get('/users', async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render('users', { users });
});

app.get('/user/details/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ raw: true, where: { id } });
  res.render('userDetails', { user });
});

app.get('/user/update/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id }, raw: true });
  res.render('userUpdate', { user });
});

app.post('/user/update/:id', async (req, res) => {
  let { Name, Salary, Ocupation, Newsletter } = req.body;
  const { id } = req.params;

  Newsletter = Newsletter === 'on';
  await User.update({ Name, Ocupation, Salary, Newsletter }, { where: { id } });

  res.redirect('/users');
});

app.post('/user/delete/:id', async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.redirect('/');
});

app.post('/user/create', async (req, res) => {
  let { Name, Ocupation, Salary, Newsletter } = req.body;
  Newsletter = Newsletter === 'on';

  await User.create({ Name, Ocupation, Salary, Newsletter });
  res.redirect('/users');
});

// Conecta e sincroniza o banco de dados, depois sobe o servidor
conection.authenticate()
  .then(() => {
    console.log("Conexão com banco de dados bem sucedida");
    return conection.sync({ force: false });
  })
  .then(() => {
    console.log("Tabelas sincronizadas com o banco.");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ou sincronizar com o banco de dados:", err);
  });
