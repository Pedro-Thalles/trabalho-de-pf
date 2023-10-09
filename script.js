/*
Esse projeto foi baseado na criação de outros desenvolvedores
https://github.com/omariosouto/flappy-bird-devsoutinho/blob/master/jogo.js
https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej
*/

/* OBS temporário:
I: Seguinte. Dia 08/10 às 13H54 que escrevo. Fiz algumas alterações nesse código, mas ainda assim o código não funciona.
Esse 'refinamento' foi 'combinado' para que algum(alguns) dos 3 outros integrantes do grupo tentasse ontem fazer o jogo voltar
a funcionar, pois estaria muito atarefado com as outras matérias e afazeres. Como se deve notar, ontem não houve nenhum commit
ou alteração e eu não vou quebrar cabeça nesse tempo que resta pra resolver isso sozinho. Há outras matérias que também preciso me 
atentar se quiser passar. Então seja quem for ler isso, ainda há tempo resolver pra enviar hoje. Se não, tchau e benção, pois já 
gasteu tempo além do que planejava pra esse trabalho.

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
  canochao,
  canoceu,
  width,
  height,

  // extras
  pares,
}) => {
  const canos = {
    width,
    height,
    canochao,
    spriteX,
    spriteY,
    canoceu,
    desenha() {
      canos.pares.forEach(function (par) {
        const yAleatorio = par.y; 
        const espacamentoentrecanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yAleatorio; 
        contexto.drawImage(
          sprites,
          canos.canoceu.spriteX,
          canos.canoceu.spriteY,
          canos.width,
          canos.height,
          canoCeuX,
          canoCeuY,
          canos.width,
          canos.height
        );
        const canoChaoX = par.x;
        const canoChaoY = 400 + espacamentoentrecanos + yAleatorio;
        contexto.drawImage(
          sprites,
          canos.canochao.spriteX,
          canos.canochao.spriteY,
          canos.width,
          canos.height,
          canoChaoX,
          canoChaoY,
          canos.width,
          canos.height
        );

        (par.canoCeu = {
          x: canoCeuX,
          y: canoCeuY + canos.height,
        }),
          (par.canoChao = {
            x: canoChaoX,
            y: canoChaoY,
          });
      });
    },

    temContatoPassaro(par) {
      const cabecadopássaro = globais.passaro.y;
      const pedopássaro = globais.passaro.y + globais.passaro.height;

      if (globais.passaro.x + globais.passaro.width >= par.x) {

        if (cabecadopássaro <= par.canoCeu.y) {
          return true;
        }

        if (pedopássaro >= par.canoChao.y) {
          return true;
        }
      }
      
      else return false;
    },

    pares,
    atualiza() {
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

      canos.pares.forEach((par) => {
        par.x -= 2;

        if (canos.temcontatopassaro(par)) {
          console.log('Você perdeu!');
          som_HIT.play();
          mudarParaTela(telas.gameOver);
        }

        if (par.x + canos.width <= 0) {
          const [_, ...restante] = canos.pares;
          this.pares = restante;
        }
      });
    },
  };
  return canos; 
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

const sprites = new Image();
sprites.src = './sprites.png';

const mudarParaTela = (NovaTela) => {
  telaAtiva = NovaTela
  if (telaAtiva.inicializar) {
    telaAtiva.inicializar();
  }
};

canvas.addEventListener('click', () => {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

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

const canos = criarCanos({
  contexto,
  sprites,
  width: 52,
  height: 400,
  canochao : {
      spriteX: 0,
      spriteY: 169,
    },
  canoceu: {
      spriteX: 52,
      spriteY: 169,
    },
  pares: []
});

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

// Configuração das telas do jogo.

let telaAtiva = {};
const globais = {};

const inicializar = () => {
  globais.passaro = passaro;
  globais.canos = canos;
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
  globais.placar = criarPlacar({
    contexto,
    canvas,
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
      desenha: desenharTelaInicio(),
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
  },
};

const cicloDeJogo = () => {
  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames++;
  requestAnimationFrame(cicloDeJogo);
};

mudarParaTela(telas.inicio);
cicloDeJogo();

