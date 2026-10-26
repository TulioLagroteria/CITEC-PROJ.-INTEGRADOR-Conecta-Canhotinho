export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ======================================================
    // 🏠 PÁGINAS ESTÁTICAS
    // ======================================================
    if (path === '/' || path === '/index.html') {
      return serveFile('index.html', 'text/html; charset=utf-8', env);
    }
    if (path === '/logo' || path === '/logodeentrada.html') {
      return serveFile('logodeentrada.html', 'text/html; charset=utf-8', env);
    }
    if (path === '/index') {
      return serveFile('index.html', 'text/html; charset=utf-8', env);
      
    }
    if (path === '/areadelogin') {
      return serveFile('areadelogin.html', 'text/html; charset=utf-8', env);
    }
    if (path === '/ficha_agendamento') {
      return serveFile('ficha_agendamento.html', 'text/html; charset=utf-8', env);
    }
    if (path === '/posicaonafila') {
      return serveFile('posicaonafila.html', 'text/html; charset=utf-8', env);
    }
    if (path === '/sistemapreferencial') {
      return serveFile('sistemapreferencial.html', 'text/html; charset=utf-8', env);
    }

    // ======================================================
    // 📁 ARQUIVOS DE ESTILO, SCRIPTS E IMAGENS
    // ======================================================
    if (path.startsWith('/css/')) {
      return serveFile(path.slice(1), 'text/css; charset=utf-8', env);
    }
    if (path.startsWith('/js/')) {
      return serveFile(path.slice(1), 'application/javascript; charset=utf-8', env);
    }
    if (path.startsWith('/imagens/')) {
      const ext = path.split('.').pop().toLowerCase();
      const contentType = 
        ext === 'png' ? 'image/png' :
        ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
        ext === 'ico' ? 'image/x-icon' : 'application/octet-stream';
      return serveFile(path.slice(1), contentType, env);
    }

    // ======================================================
    // 🔐 LOGIN
    // ======================================================
    if (path === '/api/login' && request.method === 'POST') {
      try {
        const { email, passwordHash } = await request.json();
        if (!email || !passwordHash) {
          return Response.json({ mensagem: "E-mail e hash da senha são obrigatórios." }, { status: 400 });
        }
        const usuario = await env.DB.prepare('SELECT * FROM usuarios WHERE email = ?')
          .bind(email.toLowerCase().trim())
          .first();
        if (!usuario) {
          return Response.json({ mensagem: "E-mail não encontrado." }, { status: 401 });
        }
        if (passwordHash !== usuario.senha_hash) {
          return Response.json({ mensagem: "Senha incorreta." }, { status: 401 });
        }
        return Response.json({ 
          mensagem: "Login realizado com sucesso!",
          usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil }
        });
      } catch (error) {
        return Response.json({ mensagem: error.message }, { status: 500 });
      }
    }

    // ======================================================
    // 📝 CADASTRO
    // ======================================================
    else if (path === '/api/cadastro' && request.method === 'POST') {
      try {
        const { nome, email, cpf, telefone, passwordHash } = await request.json();
        if (!nome || !email || !cpf || !passwordHash) {
          return Response.json({ mensagem: "Nome, e-mail, CPF e senha são obrigatórios." }, { status: 400 });
        }
        const emailTratado = email.toLowerCase().trim();
        const usuarioExistente = await env.DB.prepare('SELECT id FROM usuarios WHERE email = ? OR cpf = ?')
          .bind(emailTratado, cpf)
          .first();
        if (usuarioExistente) {
          return Response.json({ mensagem: "Este e-mail ou CPF já está cadastrado." }, { status: 409 });
        }
        await env.DB.prepare(`
          INSERT INTO usuarios (nome, email, cpf, telefone, senha_hash, perfil)
          VALUES (?, ?, ?, ?, ?, 'cidadao')
        `).bind(nome, emailTratado, cpf, telefone || null, passwordHash).run();
        return Response.json({ success: true, mensagem: "Usuário cadastrado com sucesso!" });
      } catch (error) {
        return Response.json({ mensagem: error.message }, { status: 500 });
      }
    }

    // ======================================================
    // 🚪 LOGOUT
    // ======================================================
    else if (path === '/api/logout' && request.method === 'POST') {
      return Response.json({ mensagem: "Logout realizado com sucesso!" });
    }

    // ======================================================
    // 🎫 GERAR SENHA
    // ======================================================
    else if (path === '/api/senha' && request.method === 'POST') {
      try {
        const { tipo } = await request.json();
        if (tipo !== "normal" && tipo !== "preferencial") {
          return Response.json({ mensagem: "Tipo de senha inválido." }, { status: 400 });
        }
        const letra = tipo === "preferencial" ? "P" : "N";
        const resultado = await env.DB.prepare(
          'SELECT COUNT(*) AS total FROM posicaoFila WHERE tipo = ?'
        ).bind(tipo).first();
        const numero = resultado.total + 1;
        const senha = letra + String(numero).padStart(3, "0");
        await env.DB.prepare(
          'INSERT INTO posicaoFila (senha, tipo, status) VALUES (?, ?, ?)'
        ).bind(senha, tipo, 'aguardando').run();
        return Response.json({ senha });
      } catch (error) {
        return Response.json({ mensagem: error.message }, { status: 500 });
      }
    }

    // ======================================================
    // 📋 LISTAR FILA
    // ======================================================
    else if (path === '/api/fila') {
      try {
        const fila = await env.DB.prepare(`
          SELECT senha FROM posicaoFila 
          WHERE status = 'aguardando'
          ORDER BY
            CASE WHEN tipo = 'preferencial' THEN 0 ELSE 1 END,
            id ASC
        `).all();
        return Response.json(fila.results.map(item => item.senha));
      } catch (error) {
        return Response.json({ mensagem: error.message }, { status: 500 });
      }
    }

    // ======================================================
    // ⏭️ CHAMAR PRÓXIMA SENHA
    // ======================================================
    else if (path === '/api/proximo' && request.method === 'POST') {
      try {
        const proxima = await env.DB.prepare(`
          SELECT id, senha FROM posicaoFila
          WHERE status = 'aguardando'
          ORDER BY
            CASE WHEN tipo = 'preferencial' THEN 0 ELSE 1 END,
            id ASC
          LIMIT 1
        `).first();
        if (!proxima) return Response.json({});
        await env.DB.prepare(
          "UPDATE posicaoFila SET status = 'chamada' WHERE id = ?"
        ).bind(proxima.id).run();
        return Response.json({ senha: proxima.senha });
      } catch (error) {
        return Response.json({ mensagem: error.message }, { status: 500 });
      }
    }

    // ======================================================
    // ❌ PÁGINA 404
    // ======================================================
    return new Response(`
      <!DOCTYPE html>
      <html><body style="font-family:Arial;text-align:center;padding:3rem;">
        <h1>404 - Página não encontrada</h1>
        <a href="/">← Voltar para a página inicial</a>
      </body></html>
    `, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

    // ======================================================
    // 📦 FUNÇÃO AUXILIAR — serveFile
    // ======================================================
    async function serveFile(filePath, contentType, env) {
      try {
        const arquivo = await env.ASSETS.fetch(new Request(`/${filePath}`));
        if (!arquivo.ok) {
          throw new Error('Arquivo não encontrado');
        }
        return new Response(arquivo.body, {
          headers: { 
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600'
          }
        });
      } catch (err) {
        console.error(err);
        return new Response(`Arquivo não encontrado: ${filePath}`, { status: 404 });
      }
    }
  }
};
<<<<<<< Updated upstream
// ======================================================
// 🏠 PÁGINAS ESTÁTICAS
// ======================================================
=======
>>>>>>> Stashed changes
