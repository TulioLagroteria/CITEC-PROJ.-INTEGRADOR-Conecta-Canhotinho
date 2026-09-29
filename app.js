// Com um intuito de criar uma navegação entre paginas mais leve e tranquila, organizados todos neste arquivo.

const express = require ("express");
const app = express();
const path = require("path")
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}




// Abrirá a página inicial, onde terá as informações básicas do site, e botões para Login e Cadastro.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "telainicial.html"));

}),


// Agendamento online será onde o client realizará o cadastro de fichas para o atendimento.
app.get("/api/ficha_agendamento", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "ficha_agendamento.html"));

});

// No anexar dados, vai caminhae lado a lado com área do sistema preferencial, será onde o cliente/paciente, registrará seus dados pessoais, e a partir daí o sistema identificará se ele preencheu os dados corretamente atendendo as regras.
app.get("/api/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"));


});

// Será onde o cliente entrará na sua conta com seus dados, Login e Senha, se preencher corretamente entrará com sucesso na conta.

app.get("/api/areadelogin", (req, res) => {
     res.sendFile(path.join(__dirname, "public", "areadelogin.html"));

})


// Essa página, tem o intuito de mostrar a posição do cliente de fato, em qual lugar da fila está, tal como quantas pessoas há em sua frente, o tempo estimado, e outros detalhes como local, sala, e serviço.
  app.get("/api/posicaonafila", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "posicaonafila.html"));

});

// Será atualizada automaticamente junto com o anexar dados, onde vai avaliar os critérios que o cliente/paciente registre e definirá se ele terá preferencia ou não, caso tenha, sepre será tratado como prioridade ao registrar senhas.
  app.get("/api/sistemapreferencial", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sistemapreferencial.html"));

});

// A tela inicial terá as informacões base como nome do site, e botões para Login, Cadastro, Convidado, Esqueci a senha, em seguida, ao entrar na conta, abrirá o Conecta Canhotinho, o site oficial, onde terão diversos botões e várias informações sobre os profissionais da area, locais de atendinento da cidade entre outras coisas.
 app.get("/api/telainicial", async (req, res) => {

    await sleep(5000); // espera 3 segundos

    res.sendFile(path.join(__dirname, "public", "telainicial.html"));
});
//HEAD

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
