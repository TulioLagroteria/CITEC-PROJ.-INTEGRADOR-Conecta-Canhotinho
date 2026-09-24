// Com um intuito de criar uma navegação entre paginas mais leve e tranquila, organizados todos neste arquivo.

const express = require ("express");
const navegacao = express();

// Agendamento online será onde o cliente realizará o cadastro de fichas para o atendimento.
navegacao.get("/api/agendamentoonline", (req, res) => {
    res.send("Agendamento Online");

}),

// No anexar dados, vai caminhae lado a lado com área do sistema preferencial, será onde o cliente/paciente, registrará seus dados pessoais, e a partir daí o sistema identificará se ele preencheu os dados corretamente atendendo as regras.
navegacao.get("/api/anexardados", (req, res) => {
    res.send("Anexar Dados");

}),

// Será onde o cliente entrará na sua conta com seus dados, Login e Senha, se preencher corretamente entrará com sucesso na conta.
navegacao.get("/api/areadelogin", (req, res) => {
    res.send("Área de Login");
}), 

// Essa página, tem o intuito de mostrar a posição do cliente de fato, em qual lugar da fila está, tal como quantas pessoas há em sua frente, o tempo estimado, e outros detalhes como local, sala, e serviço.
  navegacao.get("/api/posicaonafila", (req, res) => {
    res.send("Posição na Fila");

}),

// Será atualizada automaticamente junto com o anexar dados, onde vai avaliar os critérios que o cliente/paciente registre e definirá se ele terá preferencia ou não, caso tenha, sepre será tratado como prioridade ao registrar senhas.
  navegacao.get("/api/sistemapreferencial", (req, res) => {
    res.send("Sistema Preferencial");

}),

// A tela inicial terá as informacões base como nome do site, e botões para Login, Cadastro, Convidado, Esqueci a senha, em seguida, ao entrar na conta, abrirá o Conecta Canhotinho, o site oficial, onde terão diversos botões e várias informações sobre os profissionais da area, locais de atendinento da cidade entre outras coisas.
  navegacao.get("/api/telainicial", (req, res) => {
    res.send("Área Inicial");

//HEAD
}),

navegacao.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
