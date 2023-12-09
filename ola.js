const express = require("express")
c//onst router = express.Router()

const app = express()
const porta = 3333

f//unction mostraOla(request, response){
///response.send("olá, mundo!")
//}

function mostraPorta()   {
    console.log ('Servidor criado e rodando na porta', porta)

}

//app.use(router.get('/ola' , mostraOla))

app.listen(porta, mostraPorta)

