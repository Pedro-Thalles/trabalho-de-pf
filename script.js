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


const mensagemGameOver = {// Registro da mensagem Game Over
    sX: 134, // coordenada do  ponto superior esquerdo da imagem que será recortado na imagem sprites.png
    sY: 153, // mesma coisa para o a coordenada Y
    w: 226,// largura do corte
    h: 200,// altura do corte
    x: (canvas.width / 2) - 226 / 2,// coordenada x para o ponto que será encaixado o recorte no canvas
    y: 50,// o mesmo para o y
    desenha() {// função que desenha utilizando o drawImage com os atributos anteriores
      contexto.drawImage(
        sprites,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
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
     gravidade: 0.25,//gravidade que se tornou mais realista até o momento
     atualiza(){//função para atualizar a posição do pássaro no fps determinado pela requestAnimationFrame fazendo o pássaro cair realisticamente
    if (fazColisao(passaro,globais.chao)){
       // console.log(`fez colisão`)
        som_HIT.play();       
                
                    mudaParaTela(telas.gameOver);
                
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

// I: Criando a função para gerar os canos na tela do jogador.

function criacanos(){
    const canos = {      // I: Segue a mesma lógica. Cada atributo antes de desenha() é um valor específico para o drawImage()....
         largura: 52,   // I: .... que resultrará na construção dos canos na tela. Repare que coloquei spritesX e Y diferentes...            //
         altura: 400,  // I: ... para os canos de cima e de baixo.
         canochao: {
            spriteX: 0,
            spriteY: 169,
         },
         canoceu: {
            spriteX: 52,
            spriteY: 169,
         },
         espaco: 200,
         desenha(){
            canos.pares.forEach(function(par){ // I: Eu sei que forEach quebra o paradigma. Basicamente ele vai alterar a lista original...
            const yAleatorio = par.y           // I: ...pares[] e pra cada elemento vai atribuir esses valores específicos.
            const espacamentoentrecanos = 90
    
            const canoCeuX = par.x       // I: Note que as coord (x,y) do Cano céu são dinâmicas. y é alterado a um valor aleatório...
            const canoCeuY = yAleatorio // I: ...equanto x utilizará o que está linhas de código abaixo: o canvas.width.
            // I: Desenhando os canos de cima.
            contexto.drawImage(
                sprites,
                canos.canoceu.spriteX, canos.canoceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura
            )   
            // I: Desenhando os canos do chão.
            const canoChaoX = par.x
            const canoChaoY = 400 + espacamentoentrecanos + yAleatorio
            contexto.drawImage(
                sprites,
                canos.canochao.spriteX, canos.canochao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura
             ) 

            // I: Parece até meio redundante, mas essas coordenadas par(.canoCeu e .canoChao) serão melhor identificadas na hora de aplicar a colisão. 
            par.canoCeu = {
                x: canoCeuX,
                y: canoCeuY + canos.altura 
            },

            par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
            }

          })
        },
        
        // I: A função de colisão. Ela cria um pré-requisito que utiliza as coord. do objeto pássaro e verifica se em determinado...
        // I: ...quadro essas coordenadas são ao menos as mesmas. Se sim, uma possível colisão foi detectada.
        temcontatopassaro(par){
            const cabecadopássaro = globais.passaro.y
            const pedopássaro = globais.passaro.y + globais.passaro.altura

            // I: O começo dessa condição (primeira linha) NÃO GARANTE que o pássaro colidiu com o cano, mas sim que nesse momento, ele...
            // I: ...verifica se o pássaro está na merma coordenada x do cano. soma-se à largura do passaro para verificar
            // se o bico dele que e está em contato com o cano. Se, sim há dois casos:
            if((globais.passaro.x + globais.passaro.largura) >= par.x) {
            
            // I: Se a cabeça do pássaro possui a mesma coordenada do cano no céu na coord Y.    
            if(cabecadopássaro <= par.canoCeu.y){
                return true
            }
            
            // I: Se a parte de baixo ('pé') enconstou em algum momento na coord y do cano do chão.
            if(pedopássaro >= par.canoChao.y){
                return true
                
            }
        }
        // I: E aqui é quando caso o pássaro não tenha a mesma coordenada x dos canos, o que não necessita verificar a coord y.
            return false;
        },

        // I: Pares [] é uma lista vazia. É um atributo que foi retornado códigos acima pra aplicar a function par.
         pares: [],
         // I: Atualiza segue a mesma logística dos demais, mas há outros detalhes interessantes.
         atualiza(){
            // I: Mais embaixo você verá que em loop() frames tem seu valor somado 1 a cada quadro. 
            // I: Com base nisso, foi feito uma lógica de que cada só será criado a cada 100 frames.
            const passou100frames = frames % 100 === 0
            if (passou100frames) {
                // console.log('Acabou de passar 100 frames.')
                
                // I: Sim, .push() também não é funcional. Ele aplica novos(elementos)/novas(características) ao array:
                canos.pares.push({
                    // I: aqui modifica mais uma vez a coord x e y dos canos.
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                 })
            }
            // I: Aqui os canos pela sem sua coord x alterada para que se movimentem a cada valor -2 a x. O que significa que os canos...
            // I: ...sairão da largura do canvas (deireita) até a esquerda da tela.
            canos.pares.forEach(function(par){
                par.x -= 2
                //I: Vai para a tela de game over e toca o som caso a colisão com os canos seja verdadeira.
                if (canos.temcontatopassaro(par)) {
                    console.log('Você perdeu!')
                    som_HIT.play();
                    mudaParaTela(telas.gameOver);
                }
                //I: Aqui é o seguinte. shift() é uma função que remove o elemento primeiro de uma lista e o retorna como um elemento vazio...
                //I: ..., isso é muito importante pra remover os canos que passaram pelo pássaro, fazendo com que novos apareçam sem afetar a memória.
                //I: Apesar de quebrar o paradigma, esse aqui vai precisar de mais atenção se precisar otimizar os canos de outra forma.
                if (par.x + canos.largura <= 0) {
                    canos.pares.shift()
                }
            })

         }
    }
    return canos // I: Finalmente, deixa canos preparado pra essa alterações.
}

const globais = {};

let telaAtiva = {}// variável, pois como a tela ativa vai variar não têm como ser um valor constante

const mudaParaTela = (novaTela) =>{
    telaAtiva = novaTela
    if (telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}   // função que transforma o registro vazio (ou com o registro de uma tela específica) telaAtiva no registro da tela desejada


//função de criar o placar do jogo que marcará a pontuação do jogador
const criaPlacar = () =>{
    // registro placar, que conta com os atributos pontuacao, que será uma variavel que ficará se modificando marcando os pontos
    const placar = {
        pontuacao: 0,
        // atributo atualiza serve para ir atualizando o valor do placar de acordo com a quantidade de framas que é passado na tela
        atualiza() {
            //intervalo de frames de serve para incrementar o valor 1 à pontuação a cada quantidade de frames divisivel por 10
            //serve para contar os pontos de uma maneira mais lenta
            const  intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames === 0;
            if(passouIntervalo){          
              placar.pontuacao = placar.pontuacao + 1;
            }
        },
        
        //atributo desenha serve para desenhar o frame na tela
        desenha(){
            contexto.font = '35px VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        }
    }
    return placar;
}
const telas = {
    inicio:{
        inicializa(){
           globais.passaro = criapassaro();
           globais.canos = criacanos();
           globais.chao = criachao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.passaro.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },// na tela do início, será desenhado o plano de fundo do céu azul e prediozinhos, o chão, o pássaro e a mensagem de GetReady
        click(){
            mudaParaTela(telas.jogo); // com o evento do click do mouse, será disparada a função mudaParaTela com o argumento telas.jogo, ou seja, vai trocar da tela de início para tela de Jogo 
        },
        atualiza(){
            globais.chao.atualiza();
        } // no momento, não há nada para ficar movimentando na tela inicial do jogo
    },
    jogo:{
        inicializa(){
            globais.placar = criaPlacar();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.passaro.desenha();
            globais.placar.desenha();
        },
         //mesmo raciocínio da linha 111, mas sem a mensagem de GetReady, já que o jogo já começou
         click () {
            globais.passaro.pula();
            //som_PULO.play()
         },
         //atualiza o pássaro ao clicar na tela
        atualiza(){
            globais.canos.atualiza();
            globais.chao.atualiza();
            globais.passaro.atualiza(); // na tela de jogo o pássaro vai ficar se movimentando, caindo
            globais.placar.atualiza();
        }
    },
    //tela.gameOver serve para trazer o desenho gameOver para a tela do jogo conforme a função for chamado
    gameOver:{
        // desenha a tela
        desenha(){
            mensagemGameOver.desenha();
        },
        atualiza(){

        },
        //quando estiver na tela de game over e ocorre um click, voltará para o começo do jogo
        click(){
            mudaParaTela(telas.inicio);

        }
    }
}

const loop = ()=>{// função que vai ser chamada toda hora, em loop
    telaAtiva.desenha()//desenha o que tiver que desenhar da tela ativa no momento
    telaAtiva.atualiza()// atualiza o que tiver que atualizar da tela ativa no momento
    frames ++ // I: O let frames a cada quadro, proveniente do loop, aumenta +1 em seu valor.
    requestAnimationFrame(loop) // função que vai ativar o fps, quadros por segundo, que precisa chamar a função loop toda hora, ou seja, desenhar e atualizar toda hora. Como a requestAnimationFrame junto com a drawImage dó funciona com esse esquema de laço, não dá pra trocar por algo mais funcional.
}
canvas.addEventListener('click', ()=>{ // I: Verifica se houve um clique no canvas (tela do jogo, basicamente)
    if(telaAtiva.click){ 
        telaAtiva.click() // I: Caso verdadeiro, ou seja quando a tela receber um clique, vai disparar a função click(), em telas.inicio, trocando para telas.jogo.
    }
})
mudaParaTela(telas.inicio) // executa a função mudaParaTela com o inicio já como argumento, ou seja, já deixa configurado para a primeira tela a aparecer
loop() // executa a função loop
