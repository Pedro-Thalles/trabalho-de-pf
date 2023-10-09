const imagens = new Image() // cria uma espaço de imagem
imagens.src = './sprites.png' // o espaço recebe sprites.png
const canvas = document.querySelector('canvas') // seleciona o objeto 'canvas' no html
const contexto = canvas.getContext('2d') // coloca esse objeto num contexto 2d
const somPulo = new Audio() // cria um espaço de áudio
somPulo.src = './audios/pulo.wav' //o espaço recebe pulo.wav
const novasImagens = new Image() //mesmo raciocínio da linha 1
novasImagens.src = './sprites2.png' // mesmo raciocínio da linha 2
// ################# DESENHOS #########################
//////////////////// FUNDO //////////////////////
const fundo = { 
    X:395,Y:0, largura:271, altura:204, x:0, y:canvas.height - 204, // registro do fundo, cujos elementos servirão para ativar a função desenha()
    desenha(X,Y,larg,alt,x,y){ // função que vai desenhar a imagem do sprite no canvas
        contexto.fillStyle = '#70c5ce' // permite uma cor no canvas
        contexto.fillRect(0,0,canvas.width,canvas.height) // configura essa cor no canvas. Nesse caso no canvas inteiro
        contexto.drawImage(  // o primeiro argumento é a imagem de onde será recortado o desenho no canvas, o segundo e terceiro são o ponto de referência para o recorte
            imagens,X, Y,larg, alt,x, y,larg, alt  // o quarto e quinto é o tamanho do recorte no sprite, o sexto e sétimo são o ponto de referência para encaixar o recorte no canvas
            // e o oitavo e nono é o tamanho desse recorte no canvas 
        ) 
        contexto.drawImage( // aplica denovo para terminar de preencher o canvas
            imagens,X, Y,larg, alt,x+larg, y,larg, alt
        )
    }
}
///////////////////// CHAO ///////////////////////////
const chao = { // registro do chão, raciocínio similar ao do fundo
    X:0,Y:610, largura:224, altura:112, x:0, y:canvas.height - 100, 
    desenha(X,Y,larg,alt,x,y){ // argumentos no desenha
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y, larg, alt                                           
        )
        contexto.drawImage(
            imagens,X, Y,larg, alt,x + larg, y,larg, alt                                            
        )
    }
}
//////////////////////////// PASSARO /////////////////////////////////
const passaro = Object.freeze({ // registro do pássaro, congelado para que ele se mova preservando o princípio da imutabilidade ao máximo, nesse caso
    X: 0, Y: 0,largura:33,altura:24, x: 10,y: 50,
    velocidade: 0,  //velocidade inicial zero
    pula(pulo=3.5){
        Cpassaro.velocidade = -pulo // toda vez que pular, a velocidade passa a ser o pulo, negativa, e depois volta a crescer indefinidamente
        somPulo.play()
    }, 
    atualiza(gravidade = 0.12){ // toda vez que essa função for executada a velocidade aumenta infinitamente, a não ser que o jogador pule
        Cpassaro.velocidade += gravidade
        Cpassaro.y += Cpassaro.velocidade // primeiro o Cpassaro.y = Cpassaro.y+gravidade, depois 3*gravidade, depois 6*gravidade...
    },
    desenha(X,Y,larg,alt,x,y){ 
        contexto.drawImage(
            imagens, X, Y,larg, alt, x, y,larg, alt   
        )
    }
})
const Cpassaro = {...passaro} // cópia da lista imutável, que será modificada para o pássaro se mover

//###################### FUNÇÕES ################################
////////////////////// COLISAO COM O CHAO ///////////////////////
const fazColisao=(passaro, chao)=>{ // detecta se o passaro encostou no chao
    const pePassaro = passaro.y + passaro.altura 
    const chaoy = chao.y 
    if(pePassaro >= chaoy){
        return true
    }
}

//####################### OBSTÁCULOS ###############################
// canos ímpares são os de cima
//aqui tentei desenhar cada obstáculo na esperança de conseguir criar uma função para detectar se o passaro bateu nos obstáculos
/////////////////////////CANOS/////////////////////////////
const precano1 = Object.freeze({ 
    X:52, Y:170, larg: 52, alt:400, x:canvas.width,
    y: -200,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(imagens,X,Y,larg,alt,x,y,larg,alt)
    }  
})
const cano1 = {...precano1} //linha 55

const precano2 = Object.freeze({
    X:0, Y:170, larg: 52, alt:400, x:canvas.width,
    y: canvas.height - 140,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(imagens,X,Y,larg,alt,x,y,larg,alt)
    }
})
const cano2 = {...precano2} //linha 55

const precano3 = Object.freeze({
    X:52, Y:170, larg: 52, alt:400, x:canvas.width+250,
    y: -330,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(imagens,X,Y,larg,alt,x,y,larg,alt)
    }  
})
const cano3 = {...precano3}//linha 55

const precano4 = Object.freeze({
    X:0, Y:170, larg: 52, alt:400, x:canvas.width+250,
    y: canvas.height - 270,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(imagens,X,Y,larg,alt,x,y,larg,alt)
    }
})
const cano4 = {...precano4}//linha 55

/////////////////////////////PEDRAS////////////////////////
const prepedra1 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:0 + canvas.width+350, y:0,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra1 = {...prepedra1}//linha 55

const prepedra2 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:canvas.width + 350, y:270,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra2 = {...prepedra2}//linha 55

const prepedra3 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160+canvas.width + 350, y:-60,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra3 = {...prepedra3}//linha 55

const prepedra4 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160+canvas.width + 350, y:240,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra4 = {...prepedra4}//linha 55

const prepedra5 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*2+canvas.width + 350, y:-85,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra5 = {...prepedra5}//linha 55

const prepedra6 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*2+canvas.width + 350, y:195,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra6 = {...prepedra6}//linha 55

const prepedra7 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*3+canvas.width + 350, y:-55,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra7 = {...prepedra7}//linha 55

const prepedra8= Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*3+canvas.width + 350, y:235,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra8 = {...prepedra8}//linha 55

const prepedra9 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*4+canvas.width + 350, y:0,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra9 = {...prepedra9}//linha 55

const prepedra10 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:160*4+canvas.width + 350, y:270,
    desenha(X,Y,larg,alt,x,y,nlarg=200,nalt=120){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra10 = {...prepedra10}//linha 55

const prepedra11 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1400 + canvas.width, y:320,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra11 = {...prepedra11}//linha 55

const prepedra12 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1400+canvas.width, y:165,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra12 = {...prepedra12}//linha 55

const prepedra13 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1400+canvas.width, y:10,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra13 = {...prepedra13}//linha 55

const prepedra14 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1720+canvas.width, y:320,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra14 = {...prepedra14}//linha 55

const prepedra15 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1720+canvas.width, y:260,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra15 = {...prepedra15}//linha 55

const prepedra16 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1720+canvas.width, y:200,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra16 = {...prepedra16}//linha 55

const prepedra17 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1720+canvas.width, y:140,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra17 = {...prepedra17}//linha 55

const prepedra18 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:1720+canvas.width, y:80,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra18 = {...prepedra18}//linha 55

const prepedra19 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:2060+canvas.width, y:220,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra19 = {...prepedra19}//linha 55

const prepedra20 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:2060+canvas.width, y:180,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra20 = {...prepedra20}//linha 55

const prepedra21 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:2060+canvas.width, y:120,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra21 = {...prepedra21}//linha 55

const prepedra22 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:2060+canvas.width, y:60,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra22 = {...prepedra22}//linha 55

const prepedra23 = Object.freeze({
    X:574,Y:120,larg:606,alt:356,x:2060+canvas.width, y:0,
    desenha(X,Y,larg,alt,x,y,nlarg=100,nalt=60){
        contexto.drawImage(novasImagens,X,Y,larg,alt,x,y,nlarg,nalt)
    }
})
const pedra23 = {...prepedra23}//linha 55




const telas = { //como esse arquivo é só para a página de jogo, a única tela de 'telas' é a de jogo
    jogo: {
        desenha(){ //agora executa de fato as funções 'desenha' de cada registro com seus respectivos argumentos
            fundo.desenha(
                fundo.X,fundo.Y,
                fundo.largura,fundo.altura,
                fundo.x, fundo.y
            )
            
            chao.desenha( //linha 297
                chao.X, chao.Y,
                chao.largura, chao.altura,
                chao.x, chao.y
            )
            Cpassaro.desenha(//linha 297
                Cpassaro.X, Cpassaro.Y,
                Cpassaro.largura, Cpassaro.altura,
                Cpassaro.x, Cpassaro.y
            )
            precano1.desenha(//linha 297
                cano1.X, cano1.Y,
                cano1.larg, cano1.alt,
                cano1.x, cano1.y
            )
            precano2.desenha(//linha 297
                cano2.X, cano2.Y,
                cano2.larg, cano2.alt,
                cano2.x, cano2.y
            )
            precano3.desenha(//linha 297
                cano3.X, cano3.Y,
                cano3.larg, cano3.alt,
                cano3.x, cano3.y
            )
            precano4.desenha(//linha 297
                cano4.X, cano4.Y,
                cano4.larg, cano4.alt,
                cano4.x, cano4.y
            )
            prepedra1.desenha(//linha 297
                pedra1.X, pedra1.Y,
                pedra1.larg, pedra1.alt,
                pedra1.x, pedra1.y
            )
            prepedra2.desenha(//linha 297
                pedra2.X, pedra2.Y,
                pedra2.larg, pedra2.alt,
                pedra2.x, pedra2.y
            )
            prepedra3.desenha(//linha 297
                pedra3.X, pedra3.Y,
                pedra3.larg, pedra3.alt,
                pedra3.x, pedra3.y
            )
            prepedra4.desenha(//linha 297
                pedra4.X, pedra4.Y,
                pedra4.larg, pedra4.alt,
                pedra4.x, pedra4.y
            )
            prepedra5.desenha(//linha 297
                pedra5.X, pedra5.Y,
                pedra5.larg, pedra5.alt,
                pedra5.x, pedra5.y
            )
            prepedra6.desenha(//linha 297
                pedra6.X, pedra6.Y,
                pedra6.larg, pedra6.alt,
                pedra6.x, pedra6.y
            )
            prepedra7.desenha(//linha 297
                pedra7.X, pedra7.Y,
                pedra7.larg, pedra7.alt,
                pedra7.x, pedra7.y
            )
            prepedra8.desenha(//linha 297
                pedra8.X, pedra8.Y,
                pedra8.larg, pedra8.alt,
                pedra8.x, pedra8.y
            )
            prepedra9.desenha(//linha 297
                pedra9.X, pedra9.Y,
                pedra9.larg, pedra9.alt,
                pedra9.x, pedra9.y
            )
            prepedra10.desenha(//linha 297
                pedra10.X, pedra10.Y,
                pedra10.larg, pedra10.alt,
                pedra10.x, pedra10.y
            )
            prepedra11.desenha(//linha 297
                pedra11.X, pedra11.Y,
                pedra11.larg, pedra11.alt,
                pedra11.x, pedra11.y
            )
            prepedra12.desenha(//linha 297
                pedra12.X, pedra12.Y,
                pedra12.larg, pedra12.alt,
                pedra12.x, pedra12.y
            )
            prepedra13.desenha(//linha 297
                pedra13.X, pedra13.Y,
                pedra13.larg, pedra13.alt,
                pedra13.x, pedra13.y
            )
            prepedra14.desenha(//linha 297
                pedra14.X, pedra14.Y,
                pedra14.larg, pedra14.alt,
                pedra14.x, pedra14.y
            )
            prepedra15.desenha(//linha 297
                pedra15.X, pedra15.Y,
                pedra15.larg, pedra15.alt,
                pedra15.x, pedra15.y
            )
            prepedra16.desenha(//linha 297
                pedra16.X, pedra16.Y,
                pedra16.larg, pedra16.alt,
                pedra16.x, pedra16.y
            )
            prepedra17.desenha(//linha 297
                pedra17.X, pedra17.Y,
                pedra17.larg, pedra17.alt,
                pedra17.x, pedra17.y
            )
            prepedra18.desenha(//linha 297
                pedra18.X, pedra18.Y,
                pedra18.larg, pedra18.alt,
                pedra18.x, pedra18.y
            )
            prepedra19.desenha(//linha 297
                pedra19.X, pedra19.Y,
                pedra19.larg, pedra19.alt,
                pedra19.x, pedra19.y
            )
            prepedra20.desenha(//linha 297
                pedra20.X, pedra20.Y,
                pedra20.larg, pedra20.alt,
                pedra20.x, pedra20.y
            )
            prepedra21.desenha(//linha 297
                pedra21.X, pedra21.Y,
                pedra21.larg, pedra21.alt,
                pedra21.x, pedra21.y
            )
            prepedra22.desenha(//linha 297
                pedra22.X, pedra22.Y,
                pedra22.larg, pedra22.alt,
                pedra22.x, pedra22.y
            )
            prepedra23.desenha(//linha 297
                pedra23.X, pedra23.Y,
                pedra23.larg, pedra23.alt,
                pedra23.x, pedra23.y
            )
        },
        click(){ //essa função é executada quando a janela detecta um click
            Cpassaro.pula() //linha 42
        },
        atualiza(){
            cano1.x -= 2
            cano2.x -= 2
            cano3.x -= 2
            cano4.x -= 2
            pedra1.x -= 2
            pedra2.x -= 2
            pedra3.x -= 2
            pedra4.x -= 2
            pedra5.x -= 2
            pedra6.x -= 2
            pedra7.x -= 2
            pedra8.x -= 2
            pedra9.x-= 2
            pedra10.x -= 2
            pedra11.x -=2
            pedra12.x-=2
            pedra13.x-=2
            pedra14.x-=2
            pedra15.x-=2
            pedra16.x-=2
            pedra17.x-=2
            pedra18.x-=2
            pedra19.x-=2
            pedra20.x-=2
            pedra21.x-=2
            pedra22.x-=2
            pedra23.x-=2//todos esses obstáculos vão se mover com a velocidade de 2
            Cpassaro.atualiza() // faz o pássaro cair-> linha 45
            if(fazColisao(Cpassaro, chao)){ 
                window.location.href = "index.html" //quando detecta que o jogador caiu no chao, muda para a página de início
            } 
             
            if(pedra23.x + pedra23.larg == Cpassaro.x){
                window.location.href = "index.html" // quando termina o mapa, muda para a página de início
            }
            
            
            //
        }
    }
}




const loop = ()=>{ // é aqui que o jogo de fato é executado. 
    telas.jogo.atualiza() //movimenta tudo do jogo (pássaro, obstáculos etc)
    telas.jogo.desenha() // desenha tudo
    requestAnimationFrame(loop) // loop é executada infinitamente, gerando vários quadros por segundo, desenhando toda hora
}
loop() // loop executada

window.addEventListener('click', ()=>{ //linha 450
    telas.jogo.click()
})

