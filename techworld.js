//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/techworld", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando as models
const UsuarioSchema = new mongoose.Schema({
  senha: { type: String },
  email: { type: String, required: true },
});

const ProdutograndemarcaSchema = new mongoose.Schema({
    id_produtograndemarca: { type: String, required: true },
    descricao: { type: String },
    marca: { type: String },
    datafabricacao: { type: String },
    quantidadeestoque: { type: String },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtograndemarca = mongoose.model("produtograndemarca", ProdutograndemarcaSchema);
//configuração dos roteamendos

//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
const senha = req.body.endereco;
const email = req.body.email;

  
  const Usuario = new Usuario({
    senha: senha,
    email: email,
    });


  try {
    const newProdutograndemarca = await Produtograndemarca.save();
    res.json({ error: null, msg: "Cadastro ok", ProdutograndemarcaId: newProdutograndemarca._id });
  } catch (error) {}
});

app.post("/cadastroprodutograndemarca", async (req, res) => {
    const id_produtograndemarca = req.body.id_produtograndemarca;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const datafabricacao = req.body.datafabricacao;
    const quantidadeestoque = req.body.quantidadeestoque;

const Produtograndemarca = new Produtograndemarca({
    id_produtograndemarca: id_produtograndemarca,
    descricao: descricao,
    marca: marca,
    datafabricacao: datafabricacao,
    quantidadeestoque: quantidadeestoque
  })

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

//rota de get
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/cadastroprodutograndemarca", async (req, res) =>{
    res.sendFile(__dirname + "/cadastroprodutograndemarca.html")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

