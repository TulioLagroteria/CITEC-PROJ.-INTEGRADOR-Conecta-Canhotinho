// ================================================================================
// CONSTS
// ===============================================================================

// Com um intuito de criar uma navegação entre páginas mais leve e tranquila,
// organizamos tudo neste arquivo.

const express = require("express");
const session = require('express-session');
const Database = require("better-sqlite3");
const path = require("path");
const database = require("better-sqlite3");
const db = new database("banco.db");

const app = express();
const port = 3000;
//===============================================================================
//===============================================================================

// ================================================================================
// SECRET SESSION
require('dotenv').config({ path: './secret.env' });
//===============================================================================

//===============================================================================
// APP USE
// Middlewares
//===============================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configura a sessão
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

console.log(process.env.SECRET_SESSION)
//===============================================================================
//===============================================================================

// ===============================================================================
// FUNÇÕES
// ===============================================================================
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
//===============================================================================
//===============================================================================


// ===============================================================================
//HEAD
app.get("/logodeentrada.html", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "logodeentrada.html")
    );
});
//===============================================================================


// ==============================================================================================
// APP.POST
// ==============================================================================================
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

//LOGOUT
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ mensagem: "Logout realizado com sucesso!" });
});
// -----------------------------------------------------------------------------------------------

//--------------------------------
// SENHA
//-------------------------------
app.post("/senha", (req, res) => {
    const { tipo } = req.body;

    if (tipo !== "normal" && tipo !== "preferencial") {
        return res.status(400).json({
            mensagem: "Tipo de senha inválido."
        });
    }

    const letra = tipo === "preferencial" ? "P" : "N";

    const resultado = db.prepare(`
        SELECT COUNT(*) AS total
        FROM posicaoFila
        WHERE tipo = ?
    `).get(tipo);

    const numero = resultado.total + 1;
    const senha = letra + String(numero).padStart(3, "0");

    db.prepare(`
        INSERT INTO posicaoFila (senha, tipo)
        VALUES (?, ?)
    `).run(senha, tipo);

    res.json({ senha });
});
//=========================================================================================

//=========================================================================================




// ========================================================================================
// APP.GET
// ========================================================================================
// =========================
// TELA DA LOGO
// =========================
app.get("/logo", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "logodeentrada.html")
    );
});

// =========================
// PÁGINA INICIAL
// =========================

app.get("/index", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "telainicial.html")
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

 // FILA -----------
    
    app.get("/fila", (req, res) => {
    const fila = db.prepare(`
        SELECT senha
        FROM posicaoFila
        WHERE status = 'aguardando'
        ORDER BY
            CASE
                WHEN tipo = 'preferencial' THEN 0
                ELSE 1
            END,
            id ASC
    `).all();

    res.json(fila.map(item => item.senha));
});

// PROXIMO ----------------
app.get("/proximo", (req, res) => {
    const proxima = db.prepare(`
        SELECT id, senha
        FROM senhas
        WHERE status = 'aguardando'
        ORDER BY
            CASE
                WHEN tipo = 'preferencial' THEN 0
                ELSE 1
            END,
            id ASC
        LIMIT 1
    `).get();

    if (!proxima) {
        return res.json({});
    }

    db.prepare(`
        UPDATE senhas
        SET status = 'chamada'
        WHERE id = ?
    `).run(proxima.id);

    res.json({ senha: proxima.senha });
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
// =====================================================================
// =====================================================================

// =========================
// INICIAR SERVIDOR
// =========================

app.listen(3000, () => {
    console.log("Servidor rodando 3000");
})
console.log("banco está conectado");
