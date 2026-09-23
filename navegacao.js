// Com um intuito de criar uma navegação entre paginas mais leve e tranquila, organizados todos neste arquivo.

const express = require ("express");
const navegacao = express();

navegacao.get("/api/agendamentoonline", (req, res) => {
    res.send(consultarSenha);

}),

navegacao.get("/api/anexardados", (req, res) => {
    res.json(Entrar, cadastrasse);

}),

navegacao.get("/api/areadelogin", (req, res) => {
    res.send("ARTISTAS");

}),
navegacao.get("/api/", (req, res) => {
    res.send("Página de Contato");

}),
  navegacao.get("/api/posicaonafila", (req, res) => {
    res.send("Página de Contato");

}),
  navegacao.get("/api/sistemapreferencia", (req, res) => {
    res.send("Página de Contato");

}),
  navegacao.get("/api/telainicial", (req, res) => {
    res.send("Página de Contato");

}),

app.listen(3000, () => {
    console.log("Servidor rodando 3000");
});