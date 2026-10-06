CREATE TABLE ficha_agendamento (
    id ficha_agendamento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    local TEXT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL
)

INSERT INTO eventos (nome, local, data, hora)
VALUES (
'Festival de Inverno',
'Praça Central',
'2026-10-10',
'9:00:00');


SELECT * FROM eventos;

SELECT nome, local
FROM eventos;

SELECT *
FROM eventos
WHERE id = 2;

UPDATE eventos
SET local = 'Posto de Saúde Central'
WHERE id = 1;

DELETE FROM eventos
WHERE id = 1;