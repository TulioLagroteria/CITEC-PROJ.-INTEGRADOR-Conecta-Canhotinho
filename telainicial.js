/* =========================================================
   CONFIGURAÇÕES GERAIS
   ========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
    color: #222222;
}

a {
    text-decoration: none;
}


/* =========================================================
   CABEÇALHO
   ========================================================= */

.header {
    width: 100%;
    min-height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 15px 6%;

    background: #ffffff;

    border-bottom: 1px solid #eeeeee;
}


/* LOGO */

.logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.logo span {
    font-size: 14px;
    font-weight: 700;
    color: #0057B8;
}

.logo strong {
    font-size: 18px;
    color: #F4C300;
}


/* MENU */

.header nav {
    display: flex;
    gap: 25px;
}

.header nav a {
    color: #222222;
    font-size: 15px;
    font-weight: 500;
}

.header nav a:hover {
    color: #0057B8;
}


/* BOTÃO LOGIN */

.btn-login {
    padding: 11px 22px;

    background: #0057B8;
    color: #ffffff;

    border-radius: 8px;

    font-weight: 600;
}

.btn-login:hover {
    background: #004494;
}


/* =========================================================
   HERO
   ========================================================= */

.hero {
    min-height: 500px;

    display: flex;
    align-items: center;

    padding: 70px 8%;

    background: #f5f7f8;
}

.hero-content {
    max-width: 650px;
}

.tag {
    color: #0057B8;
    font-size: 14px;
    font-weight: 700;
}

.hero h1 {
    margin-top: 15px;

    font-size: 58px;
    line-height: 1.05;
}

.hero h1 strong {
    color: #0057B8;
}

.hero p {
    margin-top: 20px;

    max-width: 550px;

    font-size: 18px;
    line-height: 1.6;

    color: #555555;
}


/* BOTÕES HERO */

.hero-buttons {
    display: flex;
    gap: 15px;

    margin-top: 30px;
}

.btn-primary,
.btn-secondary {
    padding: 14px 24px;

    border-radius: 8px;

    font-weight: 600;
}

.btn-primary {
    background: #0057B8;
    color: #ffffff;
}

.btn-secondary {
    background: #F4C300;
    color: #222222;
}


/* =========================================================
   TÍTULOS DAS SEÇÕES
   ========================================================= */

.servicos,
.destaques {
    padding: 70px 8%;
}

.section-title span {
    color: #0057B8;

    font-size: 13px;
    font-weight: 700;
}

.section-title h2 {
    margin-top: 8px;

    font-size: 32px;
}


/* =========================================================
   CARDS
   ========================================================= */

.cards {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

    margin-top: 35px;
}

.card {
    padding: 30px;

    border: 1px solid #eeeeee;

    border-radius: 12px;

    background: #ffffff;

    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    color: #222222;
}

.card:hover {
    transform: translateY(-3px);
}

.icon {
    width: 45px;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 20px;

    border-radius: 10px;

    background: #F4C300;

    font-size: 24px;
    font-weight: bold;
}

.card h3 {
    margin-bottom: 10px;

    font-size: 20px;
}

.card p {
    color: #666666;

    line-height: 1.5;
}


/* =========================================================
   NOTÍCIAS
   ========================================================= */

.noticias {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

    margin-top: 35px;
}

.noticias article {
    padding: 25px;

    border-radius: 12px;

    background: #f5f7f8;
}

.noticias article span {
    color: #0057B8;

    font-size: 12px;
    font-weight: 700;
}

.noticias article h3 {
    margin: 12px 0;

    font-size: 20px;
}

.noticias article p {
    color: #666666;

    line-height: 1.5;
}


/* =========================================================
   RODAPÉ
   ========================================================= */

footer {
    padding: 40px 8%;

    background: #0057B8;

    color: #ffffff;

    text-align: center;
}

.footer-logo {
    font-size: 20px;
    font-weight: 700;

    margin-bottom: 15px;
}

footer p {
    margin-top: 8px;

    font-size: 14px;
}


/* =========================================================
   PÁGINA DE LOGIN
   ========================================================= */

.login-page {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f5f7f8;
}

.login-container {
    width: 100%;
    max-width: 460px;

    padding: 30px 20px;
}

.login-box {
    background: #ffffff;

    padding: 40px;

    border-radius: 16px;

    box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.08);
}


/* LOGO DO LOGIN */

.login-logo {
    text-align: center;

    margin-bottom: 30px;
}

.login-logo span {
    display: block;

    color: #0057B8;

    font-size: 14px;
    font-weight: 700;
}

.login-logo strong {
    display: block;

    color: #F4C300;

    font-size: 20px;
}


/* TÍTULO */

.login-box h1 {
    text-align: center;

    margin-bottom: 10px;
}

.login-description {
    text-align: center;

    color: #666666;

    margin-bottom: 30px;
}


/* CAMPOS */

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;

    margin-bottom: 8px;

    font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="password"] {
    width: 100%;

    padding: 13px 15px;

    border: 1px solid #d5d5d5;

    border-radius: 8px;

    font-size: 16px;
}

.form-group input:focus {
    outline: none;

    border-color: #0057B8;
}


/* OPÇÕES */

.login-options {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 10px;

    margin-bottom: 25px;

    font-size: 14px;
}

.login-options a {
    color: #0057B8;
}


/* BOTÃO ENTRAR */

.btn-entrar {
    width: 100%;

    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-size: 16px;
    font-weight: 600;

    padding: 14px;

    background: #0057B8;

    color: #ffffff;
}

.btn-entrar:hover {
    background: #004494;
}


/* MENSAGEM */

.login-mensagem {
    text-align: center;

    margin-top: 15px;

    font-size: 14px;
}


/* CADASTRO */

.cadastro {
    text-align: center;

    margin-top: 25px;

    padding-top: 25px;

    border-top: 1px solid #eeeeee;
}

.cadastro p {
    margin-bottom: 8px;

    color: #666666;
}

.cadastro a {
    color: #0057B8;

    font-weight: 600;
}


/* VOLTAR */

.voltar {
    display: block;

    text-align: center;

    margin-top: 25px;

    color: #555555;
}

.voltar:hover {
    color: #0057B8;
}


/* =========================================================
   RESPONSIVIDADE
   ========================================================= */

@media (max-width: 800px) {

    .header {
        flex-direction: column;

        gap: 20px;
    }

    .header nav {
        flex-wrap: wrap;

        justify-content: center;
    }

    .cards,
    .noticias {
        grid-template-columns: 1fr 1fr;
    }

    .hero h1 {
        font-size: 45px;
    }

}


@media (max-width: 500px) {

    .cards,
    .noticias {
        grid-template-columns: 1fr;
    }

    .hero {
        padding: 50px 6%;
    }

    .hero h1 {
        font-size: 38px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .header nav {
        gap: 12px;
    }

    .login-box {
        padding: 30px 20px;
    }

    .login-options {
        flex-direction: column;

        align-items: flex-start;
    }

}

