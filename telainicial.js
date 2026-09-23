





const express = require("express");

const app = express();

const Entrar = [
    {Gmail:"",
     consultarSenha:"",},
];
const cadastrasse = [
    {Gmail:"",
     nome:"",
    }
]

app.get("/api/agendarConsulta", (req, res) => {
    res.send(consultarSenha);

},
)

app.get("/api/telainicial", (req, res) => {
    res.json(Entrar, cadastrasse);

},
)

app.get("/api/Artistas", (req, res) => {
    res.send("ARTISTAS");

},

)
app.get("/api/contato", (req, res) => {
    res.send("Página de Contato");

},

)


app.listen(3000, () => {
    console.log("Servidor rodando 3000");
}

)