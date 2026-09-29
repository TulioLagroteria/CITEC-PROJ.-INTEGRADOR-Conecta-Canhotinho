// Servidor do projeto Conecta Canhotinho

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Permite acessar HTML, CSS, JavaScript e imagens da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Função para criar uma espera
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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
        path.join(__dirname, "public", "001_telainicial.html")
    );
});


// =========================
// INICIAR SERVIDOR
// =========================

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


