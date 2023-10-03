/*
Esse projeto foi baseado na criação de outros desenvolvedores
https://github.com/omariosouto/flappy-bird-devsoutinho/blob/master/jogo.js
https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej
*/
const sprites = new Image()//Cria um espaço de imagem
sprites.src = './sprites.png'//Adiciona a imagem 'sprites.png a esse espaço'
const canvas = document.querySelector('canvas')//seleciona o objeto html 'canvas'
const contexto = canvas.getContext('2d')//coloca o canvas num contexto 2d, duas dimensões
const mensagemGetReady = {//registro para a mensagem de GetReady da tela inicial do jogo  
    spriteX : 134,
    spriteY: 0,//spriteX/Y representam as coordenadas do ponto de referência na imagem sprites.png  
    largura: 174,
    altura: 152,//largura e altura representam o tamanho do da mensagem de GetReady na imagem sprites.png  
    x:(canvas.width/2)-87  ,
    y:58,//x e y representam o ponto de referência para o encaixe do recorte de sprites.png no canvas  
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        )
}// função que contem o draw.Image referenciando os outros elementos do registro mensagemGetReady
}
const planoDeFundo = {//registro para o plano de fundo dos prediozinhos  
    spriteX : 390,
     spriteY: 0,
     largura: 275,
     altura: 204,
     x:0,
     y:canvas.height -204,// mesma raciocínio das linhas 12, 14, 16
     desenha(){
        contexto.fillStyle = '#70c5ce'// permite o canvas ser preenchido com essa cor  
        contexto.fillRect(0,0,canvas.width, canvas.height)// configura a cor para preencher todo o canvas  
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )// mesmo raciocínio da linha 25     
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura
        )  //aplicado novamente somando planoDeFundo.x + planoDeFundo.largura pois somente com o primeiro drawImage a largura do canvas não é totalmente preenchida    
     }
}
const chao = {//registro para o chão do cenário
     spriteX : 0,
     spriteY: 610,
     largura: 224,
     altura: 112,
     x:0,
     y:canvas.height -112,//mesmo raciocínio das linhas 12, 14, 16
     desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        )//mesmo raciocínio da linha 25    
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x+chao.largura, chao.y,
            chao.largura, chao.altura
        )//mesmo raciocíno da linha 50
     }
}
const passaro = {
     spriteX : 0,
     spriteY: 0,
     largura: 33,
     altura: 24,
     x:10,
     y:50,//mesmo raciocínio das linhas 12, 14, 16
     velocidade: 0,//velocidade inicial sendo zero, pois antes de o jogo começar o pássaro fica parado
     gravidade: 0.12,//gravidade que se tornou mais realista até o momento
     atualiza(){//função para atualizar a posição do pássaro no fps determinado pela requestAnimationFrame
        passaro.velocidade = passaro.velocidade + passaro.gravidade//A cada atualização de quadros a velocidade é somada com a gravidade
        passaro.y += passaro.velocidade//A cada atualização de quadros, a coordenada y do ponto de referência para desenhar o recorte de sprites.png no canvas aumenta, fazendo o pássaro cair realisticamente 
     },
     desenha(){
        contexto.drawImage(
            sprites,
            passaro.spriteX, passaro.spriteY,
            passaro.largura,passaro.altura,
            passaro.x,passaro.y,
            passaro.largura,passaro.altura
        )
     }//mesmo raciocínio da linha 25
}
let telaAtiva = {}// variável, pois como a tela ativa vai variar não têm como ser um valor constante
const mudaParaTela = (novaTela) =>{
    telaAtiva = novaTela
}   // função que transforma o registro vazio (ou com o registro de uma tela específica) telaAtiva no registro da tela desejada
const telas = {
    inicio:{
        desenha(){
            planoDeFundo.desenha()
            chao.desenha()
            passaro.desenha()
            mensagemGetReady.desenha()
        },// na tela do início, será desenhado o plano de fundo do céu azul e prediozinhos, o chão, o pássaro e a mensagem de GetReady
        click(){
            mudaParaTela(telas.jogo) // com o evento do click do mouse, será disparada a função mudaParaTela com o argumento telas.jogo, ou seja, vai trocar da tela de início para tela de Jogo 
        },
        atualiza(){
        } // no momento, não há nada para ficar movimentando na tela inicial do jogo
    },
    jogo:{
        desenha(){
            planoDeFundo.desenha()
            chao.desenha()
            passaro.desenha()
        }, //mesmo raciocínio da linha 111, mas sem a mensagem de GetReady, já que o jogo já começou
        atualiza(){
            passaro.atualiza()// na tela de jogo o pássaro vai ficar se movimentando, caindo
        }
    }
}
const loop = ()=>{// função que vai ser chamada toda hora, em loop
    telaAtiva.desenha()//desenha o que tiver que desenhar da tela ativa no momento
    telaAtiva.atualiza()// atualiza o que tiver que atualizar da tela ativa no momento
    requestAnimationFrame(loop) // função que vai ativar o fps, quadros por segundo, que precisa chamar a função loop toda hora, ou seja, desenhar e atualizar toda hora. Como a requestAnimationFrame junto com a drawImage dó funciona com esse esquema de laço, não dá pra trocar por algo mais funcional.
}
window.addEventListener('click', ()=>{ // observa os eventos na janela
    if(telaAtiva.click){ 
        telaAtiva.click() // se a página detectar um click, vai disparar a função click(), em telas.inicio
    }
})
mudaParaTela(telas.inicio) // executa a função mudaParaTela com o inicio já como argumento, ou seja, já deixa configurado para a primeira tela a aparecer
loop() // executa a função loop
