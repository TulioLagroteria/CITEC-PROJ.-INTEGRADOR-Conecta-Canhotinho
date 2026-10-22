CREATE TABLE IF NOT EXISTS
    usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf NUMBER NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS
    sessoes (
    token NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS cadastro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    idade INTEGER,
    data_nascimento TEXT,
    sistemapreferencial BOOLEAN DEFAULT true
);


CREATE TABLE IF NOT EXISTS posicaoFila (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'aguardando'
);
