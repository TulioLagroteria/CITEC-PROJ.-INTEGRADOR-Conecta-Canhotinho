<form action="/areadelogin" method="get">

        <label>nome completo:</label>
        <input type="text" name="nome completo">

        <label>identidade:</label>
        <input type="text" name="identidade">
        
        <label>sus:</label>
        <input type="text" name="sus">

        <label>senha:</label>
        <input type="text" name="senha">
        
        <label>nome:</label>
        <input type="text" name="nome">

        <label>senha:</label>
        <input type="text" name="senha">

        <label>nome:</label>
        <input type="text" name="nome">

        <label>senha:</label>
        <input type="text" name="senha">

        <label>nome:</label>
        <input type="text" name="nome">

        <label>senha:</label>
        <input type="text" name="senha">




        <button type="submit">ENTRAR</button>
</form>






const paciente = [{

        nome: "Texto", // Sempre em string.
        cpf: "123.456.789-00", // O CPF é um dado único, e será usado para identificar o paciente, e caso seja digitado errado, não será possível cadastrar o paciente.
        nascimento:"data", // Haverá uma fórmula para calcular a idade do paciente, e caso seja menor de 18 anos, não poderá ser cadastrado, e caso seja maior de 60 anos, será considerado idoso, e terá prioridade em ser atendido.
        endereco: "Rua", // O endereço é um dado importante para o paciente, e será usado para enviar notificações e lembretes.
        telefone: "123456789", // Será usado para contato.
        email: "texto@exemplo.com", // Será usado para enviar notificações e lembretes.
    },
    {
        nome: "Texto",
        cpf: "000.000.000-00",
        nascimento:"data",
        endereco: "Rua",
        telefone: "000000000",
        email: "texto1@exemplo.com"
    },]
    
