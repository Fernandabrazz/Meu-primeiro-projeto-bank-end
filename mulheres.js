const express = require("express") // iniciando o express
const router = express.Router() // config. a primeira parte darota
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa api no front- end
const conectaBancoDeDados = require('./bancoDeDados') // aqui estou ligando ao arquivo banco de dados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados 

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use (express.json())
app.use(cors())

const porta = 3333// criando a porta


 
// GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()

      response.json(mulheresVindasDoBancoDeDados)
    
  } catch (erro) {
    console.log(erro)

  }
    
}

//POST -inserir
  
  async function criaMulher(request, response) {
   
    const novaMulher = new Mulher({
        
        nome:request.body.nome,
        imagem:request.body.imagem,
        minibio:request.body.minibio,
        citacao: request.body.citacao
    })
 
    try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
    }catch(erro){
    console.log(erro)
    }
  }

  //PATCH
 async function corrigeMulher(request, response){

    try{

    const mulherEncontrada  = await Mulher.findById(request.params.id)
  
    if (request.body.nome){
      mulherEncontrada.nome = request.body.nome
    }
    if (request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem){
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao){
        mulherEncontrada.citacao = request.body.citacao
    }
    
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
  }catch (erro) {
    console.log(erro)

  }

  }

  //DELETE

async function deleteMulher(request, response) {
     
 try{

    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ mensagem: "Mulher deletada com Sucesso" });

       } catch (erro) {
        console.log(erro)
       
      }
  
}

// app.use(router.get('/mulheres', mostraMulheres)); // configrei rota GET /MULHERES
// app.use(router.post('/mulheres', criaMulher)); // configurei rota post /mulheres 
// app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei a rota PATCH/mulheres/id
// app.use(router.delete('/mulheres/:id', deleteMulher)) // configurei rota DELETE /mulheres

router.get('/mulheres', mostraMulheres);
router.post('/mulheres', criaMulher);
router.patch('/mulheres/:id', corrigeMulher);
router.delete('/mulheres/:id', deleteMulher);


app.use('/', router);

//PORTA
function mostraPorta()   {
    console.log ('Servidor criado e rodando na porta', porta)

}

app.listen(porta, mostraPorta)//SERVIDOR OUVINDO A PORTA        




