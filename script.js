/*
Esse projeto foi baseado na criação de outros desenvolvedores
https://github.com/omariosouto/flappy-bird-devsoutinho/blob/master/jogo.js
https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej
*/

/*OBS temporário:
Cada comentário será identificado pela inicial do nome de quem comentou. Acho que vai facilitar.
Por isso, sugiro que usem --> I: Irwing; P: Pedro; D: Dalisson; J: João.*/

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = `./efeitos/hit.wav`
//const som_PULO = new Audio()
//som_PULO.src = `./efeitos/pulo.wav`
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
function criachao(){
const chao = {//registro para o chão do cenário
     spriteX: 0,
     spriteY: 610,
     largura: 224,
     altura: 112,
     x: 0,
     y: canvas.height -112,//mesmo raciocínio das linhas 12, 14, 16
    atualiza(){
        const MovimentoDoChao = 1;
        const RepeteEm = chao.largura/2;
        const movimentacao = chao.x - MovimentoDoChao;
        chao.x = movimentacao % RepeteEm;
     },
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
    return chao
}
function fazColisao(passaro,chao){
    const passaroY = passaro.y + passaro.altura;
    const chaoY = chao.y;

    if(passaroY >= chaoY){
        return true;
    }
    return false;
}
function criapassaro(){
const passaro = {
     spriteX: 0,
     spriteY: 0,
     largura: 33,
     altura: 24,
     x:10,
     y:50,//mesmo raciocínio das linhas 12, 14, 16
    pulo: 4.6,
    pula(){
          /*console.log(`devo pular`)*/
          /*console.log(`antes`,passaro.velocidade)*/
               passaro.velocidade = -passaro.pulo;
        },//faz o vôo do pássaro ocorrer, ao relacionar o salto e a velocidade de forma inversa
     velocidade: 0,//velocidade inicial sendo zero, pois antes de o jogo começar o pássaro fica parado
     gravidade: 0.12,//gravidade que se tornou mais realista até o momento
     atualiza(){//função para atualizar a posição do pássaro no fps determinado pela requestAnimationFrame fazendo o pássaro cair realisticamente
    if (fazColisao(passaro,globais.chao)){
       // console.log(`fez colisão`)
        som_HIT.play();       
                setTimeout(() => {
                    mudaParaTela(telas.inicio);
                }, 500);
    return;
           }
           passaro.velocidade = passaro.velocidade + passaro.gravidade//A cada atualização de quadros a velocidade é somada com a gravidade
           passaro.y += passaro.velocidade//A cada atualização de quadros, a coordenada y do ponto de referência para desenhar o recorte de sprites.png no canvas aumenta, fazendo o pássaro cair realisticamente 
        },
        movimentos: [
                {spriteX:0, spriteY:0},//recorte no sprite com o pássaro com asa pra cima
                {spriteX:0, spriteY:26},// pássaro com asa no meio
                {spriteX:0, spriteY:52},//pássaro com asa pra baixo
                {spriteX:0, spriteY:26},// pássaro com asa no meio
        ],
        
        FrameAtual: 0,
        AtualizaoFrameAtual(){
            const IntervalodeFrames = 10;
            const passouoIntervalo = frames % IntervalodeFrames === 0;
            /*console.log(`passouointervalo`, passouoIntervalo)*/
            if (passouoIntervalo) {
            const BasedoIncremento = 1;
            const incremento = BasedoIncremento + passaro.FrameAtual;
            const BaseRepeticao = passaro.movimentos.length;
            passaro.FrameAtual = incremento % BaseRepeticao;
            }
        },
     desenha(){
         passaro.AtualizaoFrameAtual();
            const {spriteX,spriteY} = passaro.movimentos[passaro.FrameAtual];
        contexto.drawImage(
            sprites,
               spriteX,spriteY,
               passaro.largura,passaro.altura,
               passaro.x,passaro.y,
               passaro.largura,passaro.altura
        )
     }//mesmo raciocínio da linha 25
    }
    return passaro;
}

const globais = {};

let telaAtiva = {}// variável, pois como a tela ativa vai variar não têm como ser um valor constante

const mudaParaTela = (novaTela) =>{
    telaAtiva = novaTela
    if (telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}   // função que transforma o registro vazio (ou com o registro de uma tela específica) telaAtiva no registro da tela desejada

const telas = {
    inicio:{
        inicializa(){
           globais.passaro = criapassaro();
           globais.chao = criachao();
        },
        desenha(){
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.passaro.desenha()
            mensagemGetReady.desenha()
        },// na tela do início, será desenhado o plano de fundo do céu azul e prediozinhos, o chão, o pássaro e a mensagem de GetReady
        click(){
            mudaParaTela(telas.jogo) // com o evento do click do mouse, será disparada a função mudaParaTela com o argumento telas.jogo, ou seja, vai trocar da tela de início para tela de Jogo 
        },
        atualiza(){
            globais.chao.atualiza()
        } // no momento, não há nada para ficar movimentando na tela inicial do jogo
    },
    jogo:{
        desenha(){
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.passaro.desenha()
        },
         //mesmo raciocínio da linha 111, mas sem a mensagem de GetReady, já que o jogo já começou
         click () {
            globais.passaro.pula()
            //som_PULO.play()
         },
         //atualiza o pássaro ao clicar na tela
        atualiza(){
            globais.passaro.atualiza() // na tela de jogo o pássaro vai ficar se movimentando, caindo
        }
    }
}

const loop = ()=>{// função que vai ser chamada toda hora, em loop
    telaAtiva.desenha()//desenha o que tiver que desenhar da tela ativa no momento
    telaAtiva.atualiza()// atualiza o que tiver que atualizar da tela ativa no momento
    frames ++ // I: O let frames a cada quadro, proveniente do loop, aumenta +1 em seu valor.
    requestAnimationFrame(loop) // função que vai ativar o fps, quadros por segundo, que precisa chamar a função loop toda hora, ou seja, desenhar e atualizar toda hora. Como a requestAnimationFrame junto com a drawImage dó funciona com esse esquema de laço, não dá pra trocar por algo mais funcional.
}
canvas.addEventListener('click', ()=>{ // observa os eventos na janela
    if(telaAtiva.click){ 
        telaAtiva.click() // se a página detectar um click, vai disparar a função click(), em telas.inicio
    }
})
mudaParaTela(telas.inicio) // executa a função mudaParaTela com o inicio já como argumento, ou seja, já deixa configurado para a primeira tela a aparecer
loop() // executa a função loop
