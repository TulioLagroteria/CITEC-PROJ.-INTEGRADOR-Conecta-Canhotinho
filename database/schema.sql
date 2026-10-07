CREATE TABLE ficha_agendamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    local TEXT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL
)

INSERT INTO ficha_agendamento (nome, local, data, hora)
VALUES (
'João da Silva',
'Posto de Saúde Central',
'2026-10-10',
'9:00:00');


SELECT * FROM ficha_agendamento;

SELECT nome, local
FROM ficha_agendamento

SELECT *
FROM ficha_agendamento
WHERE id = 2;

UPDATE ficha_agendamento
SET local = 'Posto de Saúde Central'
WHERE id = 1;

DELETE FROM ficha_agendamento
WHERE id = 1;

// ----------------------------------------------------------------------------------------------------


CREATE TABLE cadastro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    sistemapreferencial BOOLEAN NOT NULL
)

INSERT INTO cadastro (nome, idade, data_nascimento, sistemapreferencial)
VALUES (
'João da Silva',
'30',
'1993-05-15',
true);
