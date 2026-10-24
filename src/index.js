export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 🏠 PÁGINA PRINCIPAL — Raiz /
    if (path === '/' || path === '/index.html') {
      return serveFile('index.html', 'text/html; charset=utf-8');
    }

    // 📁 Arquivos estáticos
    if (path.startsWith('/css/')) {
      return serveFile(path.slice(1), 'text/css; charset=utf-8');
    }
    if (path.startsWith('/imagens/')) {
      const ext = path.split('.').pop().toLowerCase();
      const contentType = 
        ext === 'png' ? 'image/png' :
        ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
        ext === 'ico' ? 'image/x-icon' : 'application/octet-stream';
      return serveFile(path.slice(1), contentType);
    }
    if (path === '/areadelogin.html' || path === '/login.html') {
      return serveFile(path.slice(1), 'text/html; charset=utf-8');
    }

    // 🟢 API — Status
    if (path === '/api/status') {
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
    else if (path === '/api/usuarios') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM usuarios').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 📋 Serviços
    else if (path === '/api/servicos') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM servicos').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 🏘️ Empresas/Prestadores
    else if (path === '/api/empresas') {
      try {
        const dados = await env.DB.prepare('SELECT * FROM empresas').all();
        return Response.json(dados);
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 📅 Agendamentos
    else if (path === '/api/agendamentos') {
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
    else if (path === '/api/avaliacoes') {
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

    // ❌ 404
    return new Response(`
      <!DOCTYPE html>
      <html><body style="font-family:Arial;text-align:center;padding:3rem;">
        <h1>404 - Página não encontrada</h1>
        <a href="/">← Voltar para a página inicial</a>
      </body></html>
    `, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

    // 📦 Função auxiliar para servir arquivos
    async function serveFile(filePath, contentType) {
      try {
        const file = await fetch(new URL(`../public/${filePath}`, import.meta.url));
        if (!file.ok) throw new Error('Arquivo não encontrado');
        return new Response(file.body, {
          headers: { 
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600'
          }
        });
      } catch (err) {
        return new Response(`Arquivo não encontrado: ${filePath}`, { status: 404 });
      }
    }
  }
}