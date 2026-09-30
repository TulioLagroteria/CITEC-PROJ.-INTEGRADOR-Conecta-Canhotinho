CREATE TABLE ficha_agendamento (
    id ficha_agendamento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    local TEXT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL
)
SELECT * FROM ficha_agendamento;

SELECT nome, local, data, hora FROM ficha_agendamento;
FROM ficha_agendamento

SELECT * 
FROM ficha_agendamento
WHERE id = 1;