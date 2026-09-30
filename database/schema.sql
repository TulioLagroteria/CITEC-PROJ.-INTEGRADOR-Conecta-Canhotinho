CREATE TABLE ficha_agendamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    local TEXT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL
)