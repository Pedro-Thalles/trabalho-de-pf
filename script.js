/*
Esse projeto foi baseado na criação de outros desenvolvedores
https://github.com/omariosouto/flappy-bird-devsoutinho/blob/master/jogo.js
https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej
*/

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')




const mensagemGetReady = {
    spriteX : 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x:(canvas.width/2)-87  ,
    y:58,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        )
}
}
const planoDeFundo = {
    spriteX : 390,
     spriteY: 0,
     largura: 275,
     altura: 204,
     x:0,
     y:canvas.height -204,
     desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura
        )    
     }
}

const chao = {
     spriteX : 0,
     spriteY: 610,
     largura: 224,
     altura: 112,
     x:0,
     y:canvas.height -112,
     desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        )

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x+chao.largura, chao.y,
            chao.largura, chao.altura
        )
     }
}

const passaro = {
     spriteX : 0,
     spriteY: 0,
     largura: 33,
     altura: 24,
     x:10,
     y:50,
     velocidade: 0,
     gravidade: 0.12,
     atualiza(){
        passaro.velocidade = passaro.velocidade + passaro.gravidade
        passaro.y += passaro.velocidade
     },
     desenha(){
        contexto.drawImage(
            sprites,
            passaro.spriteX, passaro.spriteY,
            passaro.largura,passaro.altura,
            passaro.x,passaro.y,
            passaro.largura,passaro.altura
        )
     }
}
let telaAtiva = {}
const mudaParaTela = (novaTela) =>{
    telaAtiva = novaTela
}   

const telas = {
    inicio:{
        desenha(){
            planoDeFundo.desenha()
            chao.desenha()
            passaro.desenha()
            mensagemGetReady.desenha()
        },
        click(){
            mudaParaTela(telas.jogo)
        },
        atualiza(){

        }

    },
    jogo:{
        desenha(){
            planoDeFundo.desenha()
            chao.desenha()
            passaro.desenha()
        },
        atualiza(){
            passaro.atualiza()
        }
    }
}


const loop = ()=>{
    telaAtiva.desenha()
    telaAtiva.atualiza()
    
    
    
    requestAnimationFrame(loop)
}
window.addEventListener('click', ()=>{
    if(telaAtiva.click){
        telaAtiva.click()
    }

})

mudaParaTela(telas.inicio)
loop()
