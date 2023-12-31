const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.get('/' ,(requisicao, resposta) =>{
    resposta.render('home')
})

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/ completar', (requisicao, resposta )=>{
    const id = requisicao.body.id

    const sql = `
      UPDATE tarefas
      SET completa ='1'
      WHERE id = ${id}
    `

    conexao.query(sql, (erro) =>{
        if (erro){
            return console.log(erro)
        }
        resposta.redirect('/')
    })
})


app.post('/descompletar', (requisicao, resposta) =>{
    const id = requisicao.body.id

    const sql = `
    UPDATE tarefas` 
    SET completa ='0'
    WHERE id = ${id}

    conexao.query(sql, (erro) =>{
        if (erro){
            return console.log(erro)
        }
        resposta.redirect('/')
    })
})


app.post('/criar', (requisicao, resposta) =>{
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
    INSERT INTO tarefas(descricao, completa)
    VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql,(erro) => {
        if (erro) {
            return console.log(erro)
        }
        resposta.redirect('/')
    })
})

app.get('/' , (requisicao, resposta) => {
    const sql  = `
    SELECT  * FROM tarefas
    WHERE completa = 1
    `
    conexao.query(sql, (erro, dados) =>{
        if (erro){
            return console.log(erro)
        }
        const tarefas = dados.map((dado) =>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: true
            }
        })

        const quandidadeTarefas =  tarefas.lenght

        resposta.render('completas', {tarefas, quandidadeTarefas})
    })
})

app.post('excluir', (requisicao,resposta)=>{
    const id = requisicao.body.id

    const sql = `
    DELETE FROM tarefas
    WHERE id = ${id}
    `

    conexao.query(sql, (erro) =>{
        if(erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})
app.get('/ativas', (requisicao, resposta) =>{
    const sql = `
    SELECT  * FROM  tarefas
    WHERE completa = 0
    `
    conexao.query(sql, (erro, dados) =>{
        if (erro){
            return console.log(erro)
        }
        const tarefas = dados.map((dado) =>{
            return{
                id: dado.id,
                descricao: dado.descricao,
                completa: false
            }
        })
    })


})


app.get('/' , (requisicao, resposta) => {
   const sql  = 'SELECT * FROM tarefas'

   conexao.query(sql, (erro, dados) =>{
    if(erro){
        return console.log(erro)
    }

    const tarefas = dados.map((dado) => {
        return {
            id: dado.id,
            descricao: dado.descricao,
            completa: dado completo === 0 ? false : true
      } 

      const tarefasAtivas = tarefas.filter((tarefa) =>{
        return tarefa.completa === false && tarefa
      })

      const quandidadeTarefasAtivas = tarefasAtivas.lenght
    })
    resposta.render('home', {tarefas, quandidadeTarefasAtivas})
   })
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "todoapp",
    port : 3306


})

conexao.connect((erro) => {
    if(erro){
        return console.log(erro)
    }
    console.log("estou conectado ao  o Mysql")

    app.listen(3004, () => {
        console.log("Servidor rodando na porta 3001!")
    }) 
})

