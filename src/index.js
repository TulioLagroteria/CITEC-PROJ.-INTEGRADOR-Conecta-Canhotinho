export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);

    // 🟢 Rota de status
    if (url.pathname === '/api/status') {
      try {
        await env.DB.prepare('SELECT 1').run();
        return Response.json({
          status: 'online',
          database: 'conectado',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 👤 Usuários
    else if (url.pathname === '/api/usuarios') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM usuarios').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 📋 Serviços
    else if (url.pathname === '/api/servicos') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM servicos').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 🏘️ Empresas/Prestadores
    else if (url.pathname === '/api/empresas') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM empresas').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 📅 Agendamentos
    else if (url.pathname === '/api/agendamentos') {
      try {
        const dados = await env.DB.prepare(`
          SELECT agendamentos.*, 
                 usuarios.nome AS usuario_nome,
                 servicos.titulo AS servico_nome
          FROM agendamentos
          JOIN usuarios ON agendamentos.usuario_id = usuarios.id
          JOIN servicos ON agendamentos.servico_id = servicos.id
        `).all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 💬 Avaliações
    else if (url.pathname === '/api/avaliacoes') {
      try {
        const dados = await env.DB.prepare(`
          SELECT avaliacoes.*, usuarios.nome AS usuario_nome
          FROM avaliacoes
          JOIN usuarios ON avaliacoes.usuario_id = usuarios.id
        `).all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // ❌ Rota não encontrada
    return Response.json({ error: 'Rota não encontrada' }, { status: 404 });
  }
}