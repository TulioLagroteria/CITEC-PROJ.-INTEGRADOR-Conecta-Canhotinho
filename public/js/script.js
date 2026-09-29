fetch("/api/areadelogin")
.then(resposta => resposta.json())
.then(areadelogin => {
    console.log(areadelogin);
});

console.log("JavaScript do Front-end executado!");