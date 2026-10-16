
const senhaHash = bcrypt.hashSync("0123456789", 10);
const senhaCorreta = bcrypt.compareSync("0123456789", senhaHash);
const senhaDigitada = "0123456789";

console.log(senhaDigitada);
console.log(senhaHash);
console.log(senhaCorreta);
