let tabelaDeLivros = document.querySelector("#livros")
tabelaDeLivros.addEventListener("click", (event) => {
    let elementoClickado = event.target
    console.log("elementoClickado", elementoClickado)

    if(elementoClickado.dataset.type == "remocao") {
        let livroId = elementoClickado.dataset.ref
        fetch(`http://localhost:3000/livros/${livroId}`, { method: "DELETE" })
            .then((resposta) => {
                console.log("resposta", resposta)
                let tr = elementoClickado.closest(`#livro_${livroId}`)
                tr.remove()
            }).catch((error) => {
                console.log("erro:", error)
            })
    }
})