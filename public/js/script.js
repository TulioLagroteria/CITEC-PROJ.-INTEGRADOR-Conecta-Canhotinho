fetch("/api/areadelogin")
.then(resposta => resposta.json())
.then(areadelogin => {
    console.log(areadelogin);
});
fetch("/api/cadastro")
.then(resposta => resposta.json())
.then(cadastro => {
    console.log(cadastro);
});
fetch("/api/ficha_agendamento")
.then(resposta => resposta.json())
.then(ficha_agendamento => {
    console.log(ficha_agendamento);
});
fetch("/api/posicaonafila")
.then(resposta => resposta.json())
.then(posicaonafila => {
    console.log(posicaonafila);
});
fetch("/api/sistemapreferencial")
.then(resposta => resposta.json())
.then(sistemapreferencial => {
    console.log(sistemapreferencial);
});
fetch("/api/telainicial")
.then(resposta => resposta.json())
.then(telainicial => {
    console.log(telainicial);
});

console.log("JavaScript do Front-end executado!");