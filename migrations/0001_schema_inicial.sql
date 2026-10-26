-- Migration 0001: schema inicial (baseado em database/schema.sql)

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    senha_hash TEXT NOT NULL,
    perfil TEXT NOT NULL CHECK(perfil IN ('cidadao', 'atendente'))
);

CREATE TABLE IF NOT EXISTS sessoes (
    token TEXT PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    expira_em INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS servicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    unidade TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    horario TEXT NOT NULL,               
    status TEXT NOT NULL CHECK(status IN ('agendado', 'cancelado')) DEFAULT 'agendado',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE,
    UNIQUE(servico_id, data, horario)
);

CREATE TABLE IF NOT EXISTS senhas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('normal', 'preferencial')),
    codigo TEXT NOT NULL,                        
    criterio TEXT,                               
    status TEXT NOT NULL CHECK(status IN ('aguardando', 'chamada')) DEFAULT 'aguardando',
    created_at INTEGER DEFAULT (strftime('%s', 'now')), 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ✅ NOVA TABELA ADICIONADA AQUI
CREATE TABLE IF NOT EXISTS posicaoFila (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('normal', 'preferencial')),
    status TEXT NOT NULL CHECK(status IN ('aguardando', 'chamada')) DEFAULT 'aguardando'
);