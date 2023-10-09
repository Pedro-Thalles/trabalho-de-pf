const imagens = new Image()
imagens.src = './sprites.png'
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const mensageminicio = {
    X:134,Y:0,largura:174,altura:152,x:canvas.width/2 - 87, y:50,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y,larg, alt  
        )
    }
}

const fundo = {
    X:395,Y:0, largura:271, altura:204, x:0, y:canvas.height - 204,
    desenha(X,Y,larg,alt,x,y){ // argumentos no desenha
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


const chao = Object.freeze({
    X:0,Y:610, largura:224, altura:112, x:0, y:canvas.height - 100, 
    desenha(X,Y,larg,alt,x,y){ // argumentos no desenha
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y, larg, alt                                           
        )
        contexto.drawImage(
            imagens,X, Y,larg, alt,x + larg, y,larg, alt                                            
        )
    }
})


const passaro = Object.freeze({ // congela a lista
    X: 0, Y: 0,largura:33,altura:24, x: 10,y: 50,
    velocidade: 0, /*gravidade: 0.12,*/ 
    pula(pulo=4){
        Cpassaro.velocidade = -pulo
    }, 
    atualiza(gravidade = 0.12){
        Cpassaro.velocidade += gravidade
        Cpassaro.y += Cpassaro.velocidade
    },
    desenha(X,Y,larg,alt,x,y){ // argumentos no desenha
        contexto.drawImage(
            imagens, X, Y,larg, alt, x, y,larg, alt   
        )
    }
})



const Cchao = {...chao}
const Cpassaro = {...passaro} // cópia da lista congelada
let telaAtiva = {}
const mudaParaTela=(novaTela)=>{
    telaAtiva = novaTela
    console.log(telaAtiva)
    console.log(telas.inicio)
    console.log(telaAtiva == telas.inicio)
}



const telas = {
    inicio: {
        desenha(){
            fundo.desenha(
                fundo.X,fundo.Y,
                fundo.largura,fundo.altura,
                fundo.x, fundo.y
            )
            Cchao.desenha(
                Cchao.X, Cchao.Y,
                Cchao.largura, Cchao.altura,
                Cchao.x, Cchao.y
            )
            Cpassaro.desenha(
                Cpassaro.X, Cpassaro.Y,
                Cpassaro.largura, Cpassaro.altura,
                Cpassaro.x, Cpassaro.y
            )
            mensageminicio.desenha(
                mensageminicio.X, mensageminicio.Y,
                mensageminicio.largura, mensageminicio.altura,
                mensageminicio.x, mensageminicio.y
            )
        },
        atualiza(){

        }
    },
    jogo: {
        desenha(){
            fundo.desenha(
                fundo.X,fundo.Y,
                fundo.largura,fundo.altura,
                fundo.x, fundo.y
            )
            Cchao.desenha(
                Cchao.X, Cchao.Y,
                Cchao.largura, Cchao.altura,
                Cchao.x, Cchao.y
            )
            Cpassaro.desenha(
                Cpassaro.X, Cpassaro.Y,
                Cpassaro.largura, Cpassaro.altura,
                Cpassaro.x, Cpassaro.y
            )
        },
        click(){
            Cpassaro.pula()
        },
        atualiza(){
            Cpassaro.atualiza()
        }
    }
}
mudaParaTela(telas.jogo)
const loop = ()=>{
    telaAtiva.atualiza()
    telaAtiva.desenha()

    requestAnimationFrame(loop)
}
loop()

window.addEventListener('click', ()=>{
    telas.jogo.click()
})