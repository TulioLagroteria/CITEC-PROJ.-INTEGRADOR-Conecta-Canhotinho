// Com um intuito de criar uma navegação entre páginas mais leve e tranquila,
// organizamos tudo neste arquivo.

const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");
const app = express();
const port = 3000;
const session = require("express-session");
const bcrypt = require("bcrypt")

// Conecta ao banco de dados
const db = Database("./database/banco.db");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configura a sessão
app.use(session({
    secret: "sua-chave-secreta",
    resave: false,
    saveUninitialized: false
}));

// Função para criar uma espera
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function verificarLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.status(401).json({ mensagem: "Acesso não autorizado, faça login para continuar." });
    }
    next();
}

// =========================
// TELA DA LOGO
// =========================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "logoentrega.html")
    );
});

// =========================
// DIRECIONAR PARA O LOGIN
// =========================

app.post("/areadelogin", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "areadelogin.html")
    );
});

// -------------------------------------------------------------------------------
// ROTA DE LOGIN
// -----------------------------------------------------------------------------------------------
app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
    if (!usuario) {
        return res.status(401).json({ mensagem: "e-mail não encontrado." });
    }
   const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }
   req.session.usuario = { id: usuario.id, nome: usuario.nome, email: usuario.email };
    res.json({ mensagem: "Login realizado com sucesso!" });
});
// -----------------------------------------------------------------------------------------------

// =========================
// PÁGINA INICIAL
// =========================

app.get("/index", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "")
    );
});

// =========================
// LOGIN
// =========================

app.get("/areadelogin", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "areadelogin.html")
    );
});


// =========================
// AGENDAMENTO
// =========================

app.get("/ficha_agendamento", verificarLogin, (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "ficha_agendamento.html")
    );
});


// =========================
// POSIÇÃO NA FILA
// =========================

app.get("/posicaonafila", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "posicaonafila.html")
    );
});


// =========================
// SISTEMA PREFERENCIAL
// =========================

app.get("/sistemapreferencial", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "sistemapreferencial.html")
    );
});







// =========================
// INICIAR SERVIDOR
// =========================

app.listen(3000, () => {
    console.log("Servidor rodando 3000");
})
console.log("banco está conectado");
