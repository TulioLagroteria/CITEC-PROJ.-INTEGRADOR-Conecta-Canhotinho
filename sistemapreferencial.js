const cliente = [
  {id: 1, // Os 0 (zeros) à esquerda serão preenchidos automaticamente ao longo que o id cresça.
   idade: 67, // Idade atual do cliente.
   deficiencia: false, // Se o cliente possui deficiencia.
   autismo: false, // Se o cliente possui autismo.
   gestante: false, // Se o cliente está gestante.
   lactante: false, // Se o cliente está amamentando.
   criancaDeColo: false, // Se o cliente esta com criança de colo.
   mobilidadeReduzida: false, // Se o cliente possui mobilidade reduzida.
   obesidade: false, // Se o cliente está obeso.
   doadorDeSangue: false, // Se o cliente é doador de sangue.
   comprovanteDoacaoValido: false, // Se o comprovante da doacao doaçao de sangue é válido.
   },
   {
    id: 2,
    idade: 30,
    deficiencia: true,
    autismo: false,
    gestante: false,
    lactante: false,
    criancaDeColo: false,
    mobilidadeReduzida: false,
    obesidade: false,
    doadorDeSangue: false,
    comprovanteDoacaoValido: false,
   },
]

function verificarPreferencial(cliente){
    if (cliente.idade >= 60) {
        cliente.idade("Pessoa com 60 anos ou mais");
    }

    if (cliente.deficiencia) {
        cliente.deficiencia("Pessoa com deficiência");
    }

    if (cliente.autismo) {
        cliente.autismo("Pessoa com TEA");
    }

    if (cliente.gestante) {
        cliente.gestante("Gestante");
    }

    if (cliente.lactante) {
        cliente.lactante("Lactante");
    }

    if (cliente.criancaDeColo) {
        cliente.criancaDeColo("Pessoa com criança de colo");
    }

    if (cliente.mobilidadeReduzida) {
        cliente.mobilidadeReduzida("Pessoa com mobilidade reduzida");
    }

    if (cliente.obesidade) {
        cliente.obesidade("Pessoa com obesidade");
    }

    if (
        cliente.doadorDeSangue &&
        cliente.comprovanteDoacaoValido
    ) {
        cliente.comprovanteDoacaoValido("Doador de sangue")}
}
