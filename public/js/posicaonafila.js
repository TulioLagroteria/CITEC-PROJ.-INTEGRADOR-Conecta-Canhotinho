const fila = [ // Ao clicar em "confirmar criacão da senha", vai ser redirecionado pra essa pasta onde tera os dados do registro.
  {
    posicao: 1, // Ordem na fila descrita por numeros.
    id: 54, // O id trata-se de um codigo, onde cada pessoa sera reconhecida através dele pelo sistem, nele estão contidos os dados do cliente, tal como sus, endereço, telefone, etc.
    preferencial: true, // Haverá uma condição para quando esse atributo for true, se for verdade, tem prioridade em ser registrado, e  passar na frente dos outros, levando em conta se ainda há vagas na fila.
    horario: "08:00", // O sistema devera entregar com base nas outras fichas, senhas prioritárias nao poderão ser ultrapassadas por outras.
  },
  {
    posicao: 2,
    id: 20,
    preferencial: false,
    horario: "08:30",
  }
]