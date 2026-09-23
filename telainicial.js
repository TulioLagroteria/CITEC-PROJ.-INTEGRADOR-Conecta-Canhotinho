const express = require("express");

const app = express();

const consultarSenha = [
    {   cpf: "123.456.789-00", // CPF da pessoa
        especialidade: "Clínica Geral", // Especialidade da consulta.
        unidade: "UBS Central", // Unidade de saúde onde a consulta será realizada.
        profissional: "Dra. Ana", // Profissional responsável pela consulta.
        data: "20/09/2026", // Data da consulta.
        horario: "08:00", // Horário da consulta.
        status: "Disponível" // Status da consulta, se está disponível ou agendada.
    },
    {   cpf: "987.654.321-00",
        especialidade: "Odontologia",
        unidade: "Centro Odontológico",
        profissional: "Dr. Carlos",
        data: "21/09/2026",
        horario: "09:00",
        status: "Disponível" }
];

app.get("/api/agendarConsulta", (req, res) => {
    res.send(consultarSenha);

},
)

app.get("/api/index.HTML", (req, res) => {
    res.json(Eventos);

},
)

app.get("/api/Artistas", (req, res) => {
    res.send("ARTISTAS");

},

)
app.get("/api/contato", (req, res) => {
    res.send("Página de Contato");

},

)


app.listen(3000, () => {
    console.log("Servidor rodando 3000");
}

)