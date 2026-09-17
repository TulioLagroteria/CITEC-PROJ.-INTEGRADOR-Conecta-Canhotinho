// Array de usuários cadastrados
const login = [
    {
        nome: "Fulano",
        usuario: "fulaninhoPW",
        cpf: "123.456.789-00",
        senha: "senha123"
    },
    {
        nome: "Beltrano",
        usuario: "beltraninhoPW",
        cpf: "000.000.000-00",
        senha: "senha000"
    },
    {
        nome: "Alisson",
        usuario: "profAlisson",
        cpf: "111.111.111-11",
        senha: "senha111"
    }
]

// Função para validar o login
function validarLogin(usuario, cpf, senha) {
    if (usuario === "" || cpf === "" || senha === "") {
        return false; // Dados incompletos
    }
   
}

//AINDA EM 