CREATE TABLE IF NOT EXISTS
    usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS
    ficha_agendamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
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

INSERT INTO cadastro (nome, idade, data_nascimento, sistemapreferencial)
VALUES (
    'João da Silva',
    30,
    '1993-05-15',
    true
);

//----------------------TABELA DE FILA DE ATENDIMENTO------------------------------------------------------------------------------
CREATE TABLE posicaoFila (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'aguardando'
);
