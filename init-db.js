const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// 1. Configura o caminho do banco de dados (ajuste se a pasta for diferente)
const dbPath = path.join(__dirname, 'database', 'banco.db');
const db = new Database(dbPath, { verbose: console.log });

console.log('Conectado ao banco de dados em:', dbPath);

try {
    // 2. Carrega e executa o schema.sql (Criação das tabelas)
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema);
        console.log('✅ schema.sql executado com sucesso!');
    } else {
        console.error('❌ Arquivo schema.sql não encontrado.');
    }

    // 3. Carrega e executa o seed.sql (Inserção de dados de teste)
    const seedPath = path.join(__dirname, 'database', 'seed.sql');
    if (fs.existsSync(seedPath)) {
        const seed = fs.readFileSync(seedPath, 'utf8');
        db.exec(seed);
        console.log('✅ seed.sql executado com sucesso!');
    } else {
        console.log('⚠️ Arquivo seed.sql não encontrado (opcional).');
    }

} catch (error) {
    console.error('❌ Erro ao rodar os scripts no banco:', error.message);
} finally {
    // 4. Fecha a conexão com o banco de dados
    db.close();
    console.log('Conexão com o banco fechada.');
}
