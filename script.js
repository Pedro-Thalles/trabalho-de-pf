/*
Esse projeto foi baseado na criação de outros desenvolvedores
https://github.com/omariosouto/flappy-bird-devsoutinho/blob/master/jogo.js
https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej
*/

/* OBS temporário:
Cada comentário será identificado pela inicial do nome de quem comentou. Acho que vai facilitar.
Por isso, sugiro que usem --> I: Irwing; P: Pedro; D: Dalisson; J: João. */

/** **** INIÌCIO CRIAÇÂO DE ELEMENTOS ***** */

/**
 * DESCRIPTION
 * @param sprites string that represents the whole text to be searched
 * @param contexto string to be extracted
 * @param spriteX string value to be considered when searching for the extract
 * @returns retorna a função responsavel por desenhar
 */
const criarElemento = ({
    sprites,
    contexto,
    spriteX,
    spriteY,
    width,
    height,
    x,
    y,
  }) => {
    return {
      desenha() {
        contexto.drawImage(
          sprites,
          spriteX,
          spriteY,
          width,
          height,
          x,
          y,
          width,
          height
        );
      },
    };
  };
  
  const criarPassaro = ({
    // base
    sprites,
    contexto,
    spriteX,
    spriteY,
    width,
    height,
    x,
    y,
  
    // extras
    pulo,
    velocidade,
    gravidade,
    frameAtual,
    movimentos,
    audioHit,
    chao,
    frames,
    mudarParaTela,
  }) => {
    return {
      spriteX,
      spriteY,
      width,
      height,
      x,
      y,
      pulo,
      velocidade,
      gravidade,
      movimentos,
      frameAtual,
      pula() {
        this.velocidade = -this.pulo;
      },
      fazColisao() {
        const passaroY = this.y + this.width;
  
        return passaroY >= chao.y;
      },
  
      atualiza() {
        if (this.fazColisao()) {
          audioHit.play();
          mudarParaTela();
        }
        this.velocidade += this.gravidade;
        this.y += this.velocidade;
      },
  
      AtualizaoFrameAtual() {
        const IntervalodeFrames = 10;
        const passouoIntervalo = frames % IntervalodeFrames === 0;
  
        if (passouoIntervalo) {
          const BasedoIncremento = 1;
          const incremento = BasedoIncremento + this.frameAtual;
          const BaseRepeticao = this.movimentos.length;
          this.frameAtual = incremento % BaseRepeticao;
        }
      },
      desenha() {
        this.AtualizaoFrameAtual();
        const { spriteX, spriteY } = this.movimentos[this.frameAtual];
        criarElemento({
          contexto,
          sprites,
          spriteX,
          spriteY,
          width: this.width,
          height: this.height,
          x: this.x,
          y: this.y,
        });
      },
    };
  };
  
  const criarCanos = ({
    // base
    sprites,
    contexto,
    spriteX,
    spriteY,
    width,
    height,
    x,
    y,
  
    // extras
    pares,
  }) => {
    const canos = {
      // I: Segue a mesma lógica. Cada atributo antes de desenha() é um valor específico para o drawImage()....
      largura: 52, // I: .... que resultrará na construção dos canos na tela. Repare que coloquei spritesX e Y diferentes...            //
      altura: 400, // I: ... para os canos de cima e de baixo.
      canochao: {
        spriteX: 0,
        spriteY: 169,
      },
      canoceu: {
        spriteX: 52,
        spriteY: 169,
      },
      espaco: 200,
      desenha() {
        canos.pares.forEach(function (par) {
          // I: Eu sei que forEach quebra o paradigma. Basicamente ele vai alterar a lista original...
          const yAleatorio = par.y; // I: ...pares[] e pra cada elemento vai atribuir esses valores específicos.
          const espacamentoentrecanos = 90;
  
          const canoCeuX = par.x; // I: Note que as coord (x,y) do Cano céu são dinâmicas. y é alterado a um valor aleatório...
          const canoCeuY = yAleatorio; // I: ...equanto x utilizará o que está linhas de código abaixo: o canvas.width.
          // I: Desenhando os canos de cima.
          contexto.drawImage(
            sprites,
            canos.canoceu.spriteX,
            canos.canoceu.spriteY,
            canos.largura,
            canos.altura,
            canoCeuX,
            canoCeuY,
            canos.largura,
            canos.altura
          );
          // I: Desenhando os canos do chão.
          const canoChaoX = par.x;
          const canoChaoY = 400 + espacamentoentrecanos + yAleatorio;
          contexto.drawImage(
            sprites,
            canos.canochao.spriteX,
            canos.canochao.spriteY,
            canos.largura,
            canos.altura,
            canoChaoX,
            canoChaoY,
            canos.largura,
            canos.altura
          );
  
          // I: Parece até meio redundante, mas essas coordenadas par(.canoCeu e .canoChao) serão melhor identificadas na hora de aplicar a colisão.
          (par.canoCeu = {
            x: canoCeuX,
            y: canoCeuY + canos.altura,
          }),
            (par.canoChao = {
              x: canoChaoX,
              y: canoChaoY,
            });
        });
      },
  
      // I: A função de colisão. Ela cria um pré-requisito que utiliza as coord. do objeto pássaro e verifica se em determinado...
      // I: ...quadro essas coordenadas são ao menos as mesmas. Se sim, uma possível colisão foi detectada.
      temContatoPassaro(par) {
        const cabecadopássaro = globais.passaro.y;
        const pedopássaro = globais.passaro.y + globais.passaro.altura;
  
        // I: O começo dessa condição (primeira linha) NÃO GARANTE que o pássaro colidiu com o cano, mas sim que nesse momento, ele...
        // I: ...verifica se o pássaro está na merma coordenada x do cano. soma-se à largura do passaro para verificar
        // se o bico dele que e está em contato com o cano. Se, sim há dois casos:
        if (globais.passaro.x + globais.passaro.largura >= par.x) {
          // I: Se a cabeça do pássaro possui a mesma coordenada do cano no céu na coord Y.
          if (cabecadopássaro <= par.canoCeu.y) {
            return true;
          }
  
          // I: Se a parte de baixo ('pé') enconstou em algum momento na coord y do cano do chão.
          if (pedopássaro >= par.canoChao.y) {
            return true;
          }
        }
        // I: E aqui é quando caso o pássaro não tenha a mesma coordenada x dos canos, o que não necessita verificar a coord y.
        return false;
      },
  
      // I: Pares [] é uma lista vazia. É um atributo que foi retornado códigos acima pra aplicar a function par.
      pares: [],
      // I: Atualiza segue a mesma logística dos demais, mas há outros detalhes interessantes.
      atualiza() {
        // I: Mais embaixo você verá que em loop() frames tem seu valor somado 1 a cada quadro.
        // I: Com base nisso, foi feito uma lógica de que cada só será criado a cada 100 frames.
        const passou100frames = frames % 100 === 0;
        if (passou100frames) {
          this.pares = [
            ...this.pares,
            {
              x: canvas.width,
              y: -150 * (Math.random() + 1),
            },
          ];
        }
        // I: Aqui os canos pela sem sua coord x alterada para que se movimentem a cada valor -2 a x. O que significa que os canos...
        // I: ...sairão da largura do canvas (deireita) até a esquerda da tela.
        canos.pares.forEach((par) => {
          par.x -= 2;
          // I: Vai para a tela de game over e toca o som caso a colisão com os canos seja verdadeira.
          if (canos.temcontatopassaro(par)) {
            console.log('Você perdeu!');
            som_HIT.play();
            mudarParaTela(telas.gameOver);
          }
          // I: Aqui é o seguinte. shift() é uma função que remove o elemento primeiro de uma lista e o retorna como um elemento vazio...
          // I: ..., isso é muito importante pra remover os canos que passaram pelo pássaro, fazendo com que novos apareçam sem afetar a memória.
          // I: Apesar de quebrar o paradigma, esse aqui vai precisar de mais atenção se precisar otimizar os canos de outra forma.
          if (par.x + canos.largura <= 0) {
            const [_, ...rest] = canos.pares;
            this.pares = rest;
          }
        });
      },
    };
    return canos; // I: Finalmente, deixa canos preparado pra essa alterações.
  };
  
  const criarChao = ({
    contexto,
    sprites,
    spriteX,
    spriteY,
    width,
    height,
    x,
    y,
  }) => {
    return {
      spriteX,
      spriteY,
      width,
      height,
      x,
      y,
      atualiza() {
        const MovimentoDoChao = 1;
        const RepeteEm = this.width / 2;
        const movimentacao = this.x - MovimentoDoChao;
        this.x = movimentacao % RepeteEm;
      },
      desenha() {
        criarElemento({
          contexto,
          sprites,
          spriteX,
          spriteY,
          width,
          height,
          x: this.x,
          y,
        });
        criarElemento({
          contexto,
          sprites,
          spriteX,
          spriteY,
          width,
          height,
          x: this.x + this.width,
          y,
        });
      },
    };
  };
  
  const criarPlanoDeFundo = ({
    canvas,
    sprites,
    contexto,
    spriteX,
    spriteY,
    width,
    height,
    x,
    y,
  }) => {
    return {
      desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);
  
        criarElemento({
          sprites,
          contexto,
          spriteX,
          spriteY,
          width,
          height,
          x,
          y,
        });
  
        criarElemento({
          sprites,
          contexto,
          spriteX,
          spriteY,
          width,
          height,
          x: x + width,
          y,
        });
      },
    };
  };
  
  const criarPlacar = ({ contexto, canvas, frames }) => {
    return {
      pontuacao: 0,
      atualiza() {
        const intervaloDeFrames = 10;
        const passouIntervalo = frames % intervaloDeFrames === 0;
        if (passouIntervalo) {
          this.pontuacao += 1;
        }
      },
      desenha() {
        contexto.font = '35px VT323';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${this.pontuacao}`, canvas.width - 10, 35);
      },
    };
  };
  /** **** FIM CRIAÇÂO DE ELEMENTOS ***** */
  
  /** **** PARTE REFATORADA ***** */
  const canvas = document.querySelector('canvas');
  const contexto = canvas.getContext('2d');
  
  const audioHit = new Audio();
  audioHit.src = `./efeitos/hit.wav`;
  
  let frames = 0;
  const telaAtiva = {};
  const globais = {};
  
  const sprites = new Image();
  sprites.src = './sprites.png';
  
  const mudarParaTela = (telaAtiva) => {
    if (telaAtiva.inicializa) {
      telaAtiva.inicializa();
    }
  };
  
  const planoDeFundoJogo = criarPlanoDeFundo({
    canvas,
    contexto,
    sprites,
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,
  });
  
  const canos = criarCanos({});
  
  const placar = criarPlacar({
    canvas,
    contexto,
    frames,
  });
  const chao = criarChao({
    contexto,
    sprites,
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
  });
  const passaro = criarPassaro({
    contexto,
    sprites,
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    velocidade: 0,
    gravidade: 0.25,
    movimentos: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
      { spriteX: 0, spriteY: 26 },
    ],
    frameAtual: 0,
    audioHit,
    chao,
    mudarParaTela: () => mudarParaTela(telas.gameOver),
    frames,
  });
  const mensagemGetReady = criarElemento({
    contexto,
    sprites,
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: canvas.width / 2 - 87,
    y: 58,
  });
  const mensagemGameOver = criarElemento({
    contexto,
    sprites,
    spriteX: 134,
    spriteY: 153,
    width: 226,
    height: 200,
    x: canvas.width / 2 - 226 / 2,
    y: 50,
  });
  
  const cicloDeJogo = (telaAtiva) => {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    frames++;
    requestAnimationFrame(cicloDeJogo);
  };
  
  canvas.addEventListener('click', () => {
    if (telaAtiva.click) {
      telaAtiva.click();
    }
  });
  
  const inicializar = () => {
    globais.passaro = passaro;
    globais.canos = criarCanos;
    globais.chao = chao;
    globais.placar = placar;
  };
  
  const desenharTelaInicio = () => {
    planoDeFundoJogo.desenha();
    globais.passaro.desenha();
    globais.chao.desenha();
    mensagemGetReady.desenha();
  };
  
  const desenharTelaJogo = () => {
    planoDeFundoJogo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.passaro.desenha();
    globais.placar.desenha();
  };
  
  const atualizarTelaJogo = () => {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.passaro.atualiza();
    globais.placar.atualiza();
  };
  
  const inicializarJogo = () => {
    global.placar = criarPlacar({
      contexto,
      canvas,
      frames,
    });
  };
  const telas = {
    inicio: {
      desenha: desenharTelaInicio,
      click: () => mudarParaTela(telas.jogo),
      atualiza: () => globais.chao.atualiza(),
    },
    jogo: {
      desenha: desenharTelaJogo,
      click: () => globais.passaro.pula(),
      atualiza: atualizarTelaJogo,
    },
    gameOver: {
      desenha: () => mensagemGameOver.desenha(),
      click: () => mudarParaTela(telas.inicio),
      atualiza: () => { },
    },
  };
  
  mudarParaTela(telas.inicio);
  cicloDeJogo(telaAtiva);