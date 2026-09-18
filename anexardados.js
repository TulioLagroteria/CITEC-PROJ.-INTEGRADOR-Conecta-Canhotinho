const paciente = {

        nome: "Texto", // Sempre em string.
        cpf: "123.456.789-00", // O CPF é um dado único, e será usado para identificar o paciente, e caso seja digitado errado, não será possível cadastrar o paciente.
        nascimento:"data", // Haverá uma fórmula para calcular a idade do paciente, e caso seja menor de 18 anos, não poderá ser cadastrado, e caso seja maior de 60 anos, será considerado idoso, e terá prioridade em ser atendido.
        endereco: "Rua", // O endereço é um dado importante para o paciente, e será usado para enviar notificações e lembretes.
        telefone: "123456789", // Será usado para contato.
        email: "texto@exemplo.com", // Será usado para enviar notificações e lembretes.
    };
