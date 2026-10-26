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

    // 🔐 COMPLEMENTO: API — Login (Ajustado para o seu schema.sql real)
    else if (path === '/api/login' && request.method === 'POST') {
      try {
        const { email, passwordHash } = await request.json();

        if (!email || !passwordHash) {
          return Response.json({ error: 'E-mail e hash da senha são obrigatórios.' }, { status: 400 });
        }

        // Validação usando as colunas reais: 'senha_hash' e trazendo o 'perfil'
        const usuario = await env.DB.prepare('SELECT id, nome, email, perfil FROM usuarios WHERE email = ? AND senha_hash = ?')
          .bind(email.toLowerCase().trim(), passwordHash)
          .first();

        if (!usuario) {
          return Response.json({ error: 'Credenciais inválidas.' }, { status: 401 });
        }

        return Response.json({
          success: true,
          mensagem: 'Login efetuado com sucesso!',
          usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil }
        });

      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    // 🔐 COMPLEMENTO: API — Cadastro (Ajustado para o seu schema.sql real)
    else if (path === '/api/cadastro' && request.method === 'POST') {
      try {
        const { nome, email, cpf, telefone, passwordHash } = await request.json();

        if (!nome || !email || !cpf || !passwordHash) {
          return Response.json({ error: 'Nome, e-mail, CPF e senha são obrigatórios.' }, { status: 400 });
        }

        const emailTratado = email.toLowerCase().trim();

        // Validação de unicidade para E-mail e CPF conforme regras do banco
        const usuarioExistente = await env.DB.prepare('SELECT id FROM usuarios WHERE email = ? OR cpf = ?')
          .bind(emailTratado, cpf)
          .first();

        if (usuarioExistente) {
          return Response.json({ error: 'Este e-mail ou CPF já está cadastrado.' }, { status: 409 });
        }

        // Insere preenchendo 'senha_hash' e definindo o check obrigatório de 'perfil' como 'cidadao'
        await env.DB.prepare(`
          INSERT INTO usuarios (nome, email, cpf, telefone, senha_hash, perfil)
          VALUES (?, ?, ?, ?, ?, 'cidadao')
        `).bind(nome, emailTratado, cpf, telefone || null, passwordHash).run();

        return Response.json({ success: true, mensagem: 'Usuário cadastrado com sucesso!' });

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
