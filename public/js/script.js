const { application, json } = require("express")

function completarTarefa(id) {
    fetch("http://localhost:3001/com/completar", {
        method: "POST",
        headers: {
            'Content-Type':application/json
        },
        body: JSON.stringify({id})
    })
    window.location.reload()
}
function excluirTarefa(id){
    fetch("http://localhost:3001/excluir", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({id})

}



function descompletarTarefa(id){
    fetch("http://localhost:3004/descompletar", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({id})
    })
    window.location.reload()
}

function alterarTema(){
    const tema = localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")



   if (tema) {
    let novoTema

    if (tema === "light") {
        novoTema = "dark"
        button.innerHTML =  `<img src="/imagens/sun-icon.png" alt="icone de sol">`
        body.classList.remove("light")
        body.classList.add("dark")
    } else {
        novoTema = "light"
        button.innerHTML = ` <img src="/imagens/moon-icon.png" alt="icone de lua">`
        body.classList.remove("dark")
        body.classList.add("light")
    }
    localStorage.setItem("tema", novoTema)
    returm
    } 
    localStorage.setItem("tema", "dark")
    body.classList.add("dark")
 }

 function verificarTema(){
    const tema = localStorage.getItem("tema")
    const body = document.querySelector("body")
    const button = document.querySelector(".tema-button")

    if (tema) {
        if (tema === "dark"){
            body.classList.add("dark")
            `<img src="/imagens/sun-icon.png" alt="icone de sol">`
        } else{
            body.classList.add("light")
            ` <img src="/imagens/moon-icon.png" alt="icone de lua">`
        }
    }
 }
 verificarTema()