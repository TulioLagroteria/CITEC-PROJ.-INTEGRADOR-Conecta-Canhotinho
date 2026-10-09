// Servidor do projeto Conecta Canhotinho

const express = require("express");
const database = require("better-sqlite3");
const db = database("./database/banco.db");
const path = require("path");
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));

// Função para criar uma espera
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.use(session({
    secret: 'chave-secreta-aula',
    resave: false,
    saveUninitialized: true
}));



// =========================
// PÁGINA INICIAL
// =========================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});


// =========================
// AGENDAMENTO
// =========================

app.get("/api/ficha_agendamento", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "ficha_agendamento.html")
    );
});


// =========================
// CADASTRO
// =========================

app.get("/api/cadastro", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "cadastro.html")
    );
});


// =========================
// LOGIN
// =========================

app.get("/api/areadelogin", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "areadelogin.html")
    );
});


// =========================
// POSIÇÃO NA FILA
// =========================

app.get("/api/posicaonafila", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "posicaonafila.html")
    );
});


// =========================
// SISTEMA PREFERENCIAL
// =========================

app.get("/api/sistemapreferencial", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "sistemapreferencial.html")
    );
});


// =========================
// TELA INICIAL COM ESPERA
// =========================

app.get("/api/telainicial", async (req, res) => {

    // Espera 3 segundos
    await sleep(3000);

    res.sendFile(
        path.join(__dirname, "public", "telainicial.html")
    );
});


// =========================
// INICIAR SERVIDOR
// =========================

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


