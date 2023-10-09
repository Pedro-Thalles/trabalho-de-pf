
const imagens = new Image()
imagens.src = './sprites.png'
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const mensageminicio = {// registro da mensagem 'getReady', cujos elementos servirão para ativar a função desenha()
    X:134,Y:0,largura:174,altura:152,x:canvas.width/2 - 87, y:50,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y,larg, alt  
        )
    }
}

const fundo = { // mesmo registro de jogo.js
    X:395,Y:0, largura:271, altura:204, x:0, y:canvas.height - 204,
    desenha(X,Y,larg,alt,x,y){ 
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.width,canvas.height)
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y,larg, alt   
        ) 
        contexto.drawImage(
            imagens,X, Y,larg, alt,x+larg, y,larg, alt
        )
    }
}


const chao = { //mesmo registro de jogo.js
    X:0,Y:610, largura:224, altura:112, x:0, y:canvas.height - 100, 
    desenha(X,Y,larg,alt,x,y){ 
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y, larg, alt                                           
        )
        contexto.drawImage(
            imagens,X, Y,larg, alt,x + larg, y,larg, alt                                            
        )
    }
}


const passaro = { 
    X: 0, Y: 0,largura:33,altura:24, x: 10,y: 50,
    velocidade: 0, 
    atualiza(gravidade = 0.12){
        Cpassaro.velocidade += gravidade
        Cpassaro.y += Cpassaro.velocidade
    },
    desenha(X,Y,larg,alt,x,y){ 
        contexto.drawImage(
            imagens, X, Y,larg, alt, x, y,larg, alt   
        )
    }
}





const inicio= {
    desenha(){ // mesmo raciocínio da linha 295 até 494 de jogo.js
        fundo.desenha(
        fundo.X,fundo.Y,
        fundo.largura,fundo.altura,
        fundo.x, fundo.y
        )
        chao.desenha(
          chao.X, chao.Y,
          chao.largura, chao.altura,
          chao.x, chao.y
        )
        passaro.desenha(
            passaro.X, passaro.Y,
            passaro.largura, passaro.altura,
            passaro.x, passaro.y
        )
        mensageminicio.desenha(
            mensageminicio.X, mensageminicio.Y,
            mensageminicio.largura, mensageminicio.altura,
            mensageminicio.x, mensageminicio.y
            )
        },
    }
 

const loop = ()=>{ // mesmo raciocínio da loop() de jogo.js
    inicio.desenha()
    requestAnimationFrame(loop)
}
loop()

/*
OBS: infelizmente, devido a uma sequência de más decisões pela equipe, muita perda de um tempo que já era pouco e o cansaço, não conseguimos fazer 
novos níveis. Ficou só no nível 1. E, ainda por cima, não conseguimos fazer o jogo detectar quando o passaro colide com os obstáculos. No entanto,
conseguimos aplicar várias coisas do paradigma funcional, como a imutabilidade e as funções com argumentos e retornos.
*/