document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('btn-cadastrar');
    const textoOriginalBotao = btn.textContent;

    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value.toLowerCase().trim();
    const cpf = document.getElementById('cadastro-cpf').value;
    const telefone = document.getElementById('cadastro-telefone').value;
    const senha = document.getElementById('cadastro-senha').value;
    const confirmarSenha = document.getElementById('cadastro-confirmar-senha').value;

    // Validação básica de consistência local
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        // Desabilita o botão e muda o estado visual (boa prática de UX para o delay do PBKDF2)
        btn.disabled = true;
        btn.textContent = 'Processando segurança...';

        // Configurações alinhadas com o guia (600.000 iterações com SHA-256)
        const iterations = 600000;
        const enc = new TextEncoder();
        const saltBytes = enc.encode(email); 
        const passwordBytes = enc.encode(senha);

        // Importa a string limpa para chave criptográfica nativa do navegador
        const baseKey = await window.crypto.subtle.importKey(
            "raw", passwordBytes, "PBKDF2", false, ["deriveBits"]
        );

        // Medição real da CPU do usuário (Decisão 2)
        const t0 = performance.now();

        const derivedBits = await window.crypto.subtle.deriveBits(
            { name: "PBKDF2", salt: saltBytes, iterations: iterations, hash: "SHA-256" },
            baseKey, 256
        );

        const t1 = performance.now();
        console.log(`[PBKDF2] Finalizado em ${(t1 - t0).toFixed(2)}ms para o usuário.`);

        // Converte os bits resultantes para string Hexadecimal
        const passwordHash = Array.from(new Uint8Array(derivedBits))
            .map(b => b.toString(16).padStart(2, '0')).join('');

        // 🔄 CORREÇÃO DA ROTA DINÂMICA:
        // Identifica se você está local ou na nuvem de forma automática e segura
        const urlCadastro = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
            ? '/cadastro' 
            : '/api/cadastro';

        // Envia os dados completos com a senha já protegida via Hash para a API correta
        const resposta = await fetch(urlCadastro, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, telefone, passwordHash })
        });

        const resultado = await resposta.json();

        if (resposta.ok && resultado.success) {
            alert(resultado.mensagem || 'Conta criada com sucesso!');
            window.location.href = '/areadelogin';
        } else {
            alert('Erro no cadastro: ' + (resultado.mensagem || 'Erro desconhecido'));
        }

    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao processar o seu cadastro no servidor.');
    } finally {
        btn.disabled = false;
        btn.textContent = textoOriginalBotao;
    }
});
