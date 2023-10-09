const imagens = new Image()
imagens.src = './sprites.png'
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')
const somHit = new Audio()
somHit.src = './audios/hit.wav'
const somPulo = new Audio()
somPulo.src = './audios/pulo.wav'
const novasImagens = new Image()
novasImagens.src = './sprites2.png'

////// registros dos obstáculos




const caverna = Object.freeze({
    X:574,Y:120,largura:606,altura:356,x:0, y:0,
    desenha(X,Y,larg,alt,x,y,nlarg,nalt){
        contexto.drawImage(
            novasImagens,X, Y,larg, alt,x, y,nlarg, nalt  
        )
    }
})
const Ccaverna = {...caverna}
const mensageminicio = {
    X:134,Y:0,largura:174,altura:152,x:canvas.width/2 - 87, y:50,
    desenha(X,Y,larg,alt,x,y){
        contexto.drawImage(
            imagens,X, Y,larg, alt,x, y,larg, alt  
        )
    }
}




const yrandom = -200

const canos = Object.freeze({
    largura:52, altura: 400, chaoX:0, chaoY:169,
    ceuX:52, ceuY:170, posicaox:canvas.width + 20, ceuy:yrandom, chaoy:370, espaco:160,
     
    desenha(X1,Y1,X2,Y2,larg,alt,x,y1,y2){
        contexto.drawImage( //cano do ceu
            imagens,
            X1,Y1,
            larg,alt,
            x,y1,
            larg,alt
        )
        contexto.drawImage(//cano do chao
            imagens,
            X2,Y2,
            larg,alt,
            x,y2,
            larg,alt
        )
    },
    atualiza(){
    }
})

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

const fazColisao=(passaro, chao)=>{
    const pePassaro = passaro.y + passaro.altura
    const chaoy = chao.y 
    if(pePassaro >= chaoy){
        return true
    }
}

const passaro = Object.freeze({ // congela a lista
    X: 0, Y: 0,largura:33,altura:24, x: 10,y: 50,
    velocidade: 0, pulo:3.5, 
    pula(pulo=3.5){
        Cpassaro.velocidade = -pulo
        somPulo.play()
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


const Ccanos = {...canos}
const Cchao = {...chao}
const Cpassaro = {...passaro} // cópia da lista congelada


const espaco = Ccanos.posicaox + 280 + 50
//o pé é o y + altura
//cabeça é o y
const temColisaoComObjetos = (pePassaro,cabecaPassaro,xPassaro,PeObstaculo,cabecaObstaculo, xObstaculo ) =>{
    if(xPassaro >= xObstaculo ){
        if(cabecaPassaro <= PeObstaculo){
            return true
        }
        if(pePassaro >= cabecaObstaculo){
            return true
        }
    } 
}


const fazerCaverna = (X,Y,larg,alt,x,y,tamx=200,tamy=120)=>{
    Ccaverna.desenha(
        X,Y,
       larg, alt,
        x+canvas.width+espaco , y,
        tamx,tamy
    )
    Ccaverna.desenha(
        X,Y,
        larg, alt,
        x+canvas.width+espaco, y+270,
        tamx,tamy
    )
    Ccaverna.desenha(
       X,Y,
        larg, alt,
        x+160+canvas.width+espaco, y-60,
        tamx,tamy
    )
    Ccaverna.desenha(
        X,Y,
        larg, alt,
        x+160+canvas.width+espaco, y+230,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*2+espaco+canvas.width, y-85,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*2+espaco+canvas.width, y+195,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*3+espaco+canvas.width, y-55,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*3+espaco+canvas.width, y+235,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco+canvas.width, y,
        tamx,tamy
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco+canvas.width, y+270,
        tamx,tamy
    )
    ///////// pedrinhas entrelaçadas 
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*2+canvas.width, y+320,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*2+canvas.width, y+165,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*2+canvas.width, y+10,
        tamx/2,tamy/2
    )
    //// paredão abertura em cima
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*3+canvas.width, y+320,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*3+canvas.width, y+260,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*3+canvas.width, y+200,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*3+canvas.width, y+140,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*3+canvas.width, y+80,
        tamx/2,tamy/2
    )
    //////paredão abertura embaixo
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*4+canvas.width, y+220,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*4+canvas.width, y+160,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*4+canvas.width, y+100,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*4+canvas.width, y+40,
        tamx/2,tamy/2
    )
    caverna.desenha(
        X,Y,
        larg, alt,
        x+160*4+espaco*4+canvas.width, y-20,
        tamx/2,tamy/2
    )
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

            Ccanos.desenha(
                Ccanos.ceuX, Ccanos.ceuY,
                Ccanos.chaoX, Ccanos.chaoY,
                Ccanos.largura, Ccanos.altura,
                Ccanos.posicaox,              
                Ccanos.ceuy,Ccanos.chaoy+Ccanos.espaco+yrandom
            )
            Ccanos.desenha(
                Ccanos.ceuX, Ccanos.ceuY,
                Ccanos.chaoX, Ccanos.chaoY,
                Ccanos.largura, Ccanos.altura,
                Ccanos.posicaox+280,              
                Ccanos.ceuy - 130, Ccanos.chaoy+Ccanos.espaco +yrandom -130
            )
            ///// caverna
            fazerCaverna(Ccaverna.X, Ccaverna.Y,
                Ccaverna.largura, Ccaverna.altura,
                Ccaverna.x, Ccaverna.y)
        },
        click(){
            Cpassaro.pula()
        },
        atualiza(){
            Ccaverna.x -= 2
            Ccanos.posicaox -= 2
            Cpassaro.atualiza()
            if(fazColisao(Cpassaro, Cchao)){
                setTimeout(()=>{
                    somHit.play()
                }, 1000)
                
                Cpassaro.y  = Cchao.y - Cpassaro.altura
                
                console.log('true')
                window.location.href = "index.html"
            }
            if(temColisaoComObjetos(Cpassaro.y+Cpassaro.altura,Cpassaro.y,Cpassaro.x,Ccanos.ceuy+Ccanos.altura,Ccanos.ceuY,Ccanos.posicaox)){
                console.log('colidiuuu')
            }
            //
        }
    }
}

/*
const temColisaoComObjetos = (pePassaro,cabecaPassaro,xPassaro,PeObstaculo,cabecaObstaculo, xObstaculo ) =>{
    if(xPassaro >= xObstaculo ){
        if(cabecaPassaro <= PeObstaculo){
            return true
        }
        if(pePassaro >= cabecaObstaculo){
            return true
        }
    }
}
*/

const loop = ()=>{
    telas.jogo.atualiza()
    telas.jogo.desenha()
    console.log(Ccaverna)

    requestAnimationFrame(loop)
}
loop()

window.addEventListener('click', ()=>{
    telas.jogo.click()
})