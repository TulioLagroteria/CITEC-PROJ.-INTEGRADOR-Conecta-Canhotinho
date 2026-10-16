// Servidor do projeto Conecta Canhotinho

const express = require("express");
const path = require("path");
const database = require("better-sqlite3");
const db = new database("banco.db");

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
// SENHA -----------
app.post("/senha", (req, res) => {
    const { tipo } = req.body;

    if (tipo !== "normal" && tipo !== "preferencial") {
        return (atualizarFila());
        };
    });
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


// =========================
// INICIAR SERVIDOR
// =========================

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


