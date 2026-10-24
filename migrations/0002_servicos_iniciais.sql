-- Migration 0002: serviços iniciais (baseado em database/seed.sql)
INSERT INTO servicos (nome, unidade) VALUES 
('Clínica Geral', 'Hospital Municipal'),
('Odontologia', 'Hospital Municipal'),
('Vacinação', 'Hospital Municipal'),
('Atendimento Psicológico', 'CAPS Canhotinho'),
('Pediatria', 'Hospital Municipal'),
('Enfermagem', 'Hospital Municipal');
