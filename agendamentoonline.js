let consultarSenha = [ // Array de consultas de senha.
    {
        cpf: "123.456.789-00", // CPF da pessoa
        especialidade: "Clínica Geral", // Especialidade da consulta.
        unidade: "UBS Central", // Unidade de saúde onde a consulta será realizada.
        profissional: "Dra. Ana", // Profissional responsável pela consulta.
        data: "20/09/2026", // Data da consulta.
        horario: "08:00", // Horário da consulta.
        status: "Disponível" // Status da consulta, se está disponível ou agendada.
    },
    {
        cpf: "987.654.321-00",
        especialidade: "Odontologia",
        unidade: "Centro Odontológico",
        profissional: "Dr. Carlos",
        data: "21/09/2026",
        horario: "09:00",
        status: "Disponível"
    }
];

function agendarConsulta(registrarSenha) {

    for (let i = 0; i < registrarSenha.length; i++) {
        if (registrarSenha[i].cpf === senha) {
            if (registrarSenha[i].status === "Disponível") {

                registrarSenha[i].status = "Agendado";

                return "Senha de número" + registrarSenha[i].id + " agendada com sucesso.";
            } else {

                return "Este horário não está disponível.";
            }
        }
    }
}