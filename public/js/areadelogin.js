document.getElementById('form-login').addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('btn-entrar');
    const textoOriginalBotao = btn.textContent;

    const email = document.getElementById('login-email').value.toLowerCase().trim();
    const senha = document.getElementById('login-senha').value;

    try {
        btn.disabled = true;
        btn.textContent = 'Autenticando com segurança...';

        const iterations = 600000;
        const enc = new TextEncoder();
        const saltBytes = enc.encode(email);
        const passwordBytes = enc.encode(senha);

        const baseKey = await window.crypto.subtle.importKey(
            "raw", passwordBytes, "PBKDF2", false, ["deriveBits"]
        );

        const t0 = performance.now();

        const derivedBits = await window.crypto.subtle.deriveBits(
            { name: "PBKDF2", salt: saltBytes, iterations: iterations, hash: "SHA-256" },
            baseKey, 256
        );

        const t1 = performance.now();
        console.log(`[PBKDF2 Login] Calculado em ${(t1 - t0).toFixed(2)}ms.`);

        const passwordHash = Array.from(new Uint8Array(derivedBits))
            .map(b => b.toString(16).padStart(2, '0')).join('');

        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordHash })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            window.location.href = '/';
        } else {
            alert('Erro na autenticação: ' + (resultado.mensagem || 'Credenciais inválidas'));
        }

    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao processar o seu login.');
    } finally {
        btn.disabled = false;
        btn.textContent = textoOriginalBotao;
    }
});