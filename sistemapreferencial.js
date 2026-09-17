const cliente[
  {id: 01, // Os 0 (zeros) à esquerda serao preenchidos automaticamente ao longo qje o id cresça.
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
}]

function verificarPreferencial(cliente){
    if (pessoa.idade >= 60) {
        motivos.push("Pessoa com 60 anos ou mais");
    }

    if (pessoa.deficiencia) {
        motivos.push("Pessoa com deficiência");
    }

    if (pessoa.autismo) {
        motivos.push("Pessoa com TEA");
    }

    if (pessoa.gestante) {
        motivos.push("Gestante");
    }

    if (pessoa.lactante) {
        motivos.push("Lactante");
    }

    if (pessoa.criancaDeColo) {
        motivos.push("Pessoa com criança de colo");
    }

    if (pessoa.mobilidadeReduzida) {
        motivos.push("Pessoa com mobilidade reduzida");
    }

    if (pessoa.obesidade) {
        motivos.push("Pessoa com obesidade");
    }

    if (
        pessoa.doadorDeSangue &&
        pessoa.comprovanteDoacaoValido
    ) {
        motivos.push("Doador de sangue")}
}
