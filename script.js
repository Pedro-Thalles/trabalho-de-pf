/*
This project was based on a creation by other programmers
https://codepen.io/ju-az/pen/eYJQwLx/
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//serve pra encaixar o desenho num contexto 2d
const img = new Image();
//cria uma imagem no corpo da pagina
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";
//no fim das contas, ele cria um objeto imagem e coloca o link dos canos
//teste
let gamePlaying = false;
//estado de jogo. Se ta jogando e true
const gravity = 0.35;
//quao rapido ele chega ao chao
const speed = 2.6;
//quao rapido os canos andam
const size = [51, 36];
//o primeiro elemento eh o with e o segundo eh height
const jump = -10.5;
//eh negativo pq a gravidade eh positiva. sentido inverso
const cTenth = (canvas.width / 3);
//posicao do passaro. quanto mais proximo a 1 mais proximo ao cano


let index = 0,
//vai ter algum papel depois
bestScore = 0, 
// comeca em 0 e depois aumenta
flight, 
//vai ter algum papel
flyHeight, 
//vai ter um papel
currentScore, 
//vai ter um papel
pipe;
//vai ter um papel


// pipe settings
const pipeWidth = 78;
//largura do cano. como nao existe um cano de 156 px ele usa o que ele ja tem.
const pipeGap = 270;
//largura tanto entre a cabeca dos canos quanto entre a dupla de canos
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;
//esse aleatorio significa que a abertura do cano vai ser numa posicao aleatoria


const setup = () => {
//essa func serve pra definir as configurações do início de jogo, o score, a altura do pássaro, a situação dos três primeiros canos em formato de Array    
currentScore = 0;
//ja deixa pre definido a quantidade de canos que ele passou. no caso, zero
flight = jump;
// vai ser alguma coisa



flyHeight = (canvas.height/ 2 ) - (size[1]/2 );
//Altura do pássaro no inicio do Jogo. No caso, no meio da tela


// setup first 3 pipes
pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
//Aqui ele cria uma lista com três elementos 'undefined', ou seja, [und,und,und]. Esse undefined aparece por causa do fill sem argumento.
//Depois ele utiliza o map com dois argumentos, sendo o segundo o index de cada elemento do Array.
//No fim das contas, pipes armazenará uma lista de listas. Cada sublista Terá o um valor influenciado pelo index como primeiro elemento e um valor aleatório (referente ao pipeLoc())

}

const render = () => {
// make the pipe and bird moving 
index++;
//esse ++ significa que 'index' armazena 0 + 1, ou seja, 'index' deixa de ser 0 e passa a ser 1
//cada vez que o '++' for aplicado, index se transforma em 'index' + 1
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// background first part 
ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
/*O drawImage tem 9 argumentos base. O primeiro justamente a imagem que vai ser 'desenhada na tela'. O segundo e o terceiro são as coordenadas x e y, partindo da parede esquerda e do teto, respectivamente, de onde começará um recorte da imagem original
O quarto e o quinto é a largura e a altura do seu recorte, partindo do ponto x,y, mencionado na linha anterior. Pronto, até aí vc recortou um pedaço da imagem original.
Os próximos argumentos indicaram onde a nova imagem será colocada na tela. O sexto e o sétimo são as coordenadas x e y (mesmo esquema da linha 80) de um ponto de referência. Por fim, os argumentos 8 e 9 será, respectivamente, a altura e a largura novas do recorte que vc fez
Para uma explicação mais visual, veja as fotos desse artigo : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

No fim das contas, essa função serve para designar a primeira posição do background
perceba que o segundo e o terceiro argumento são zero, então o ponto de referência é o extremo superior esquerdo
o width e o height do canvas são os mesmos do tamanho da imagem de pixel do jogo

*/
// background second part
ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

// pipe display
if (gamePlaying){
pipes.map(pipe => {
// pipe moving
pipe[0] -= speed;

// top pipe
ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
// bottom pipe
ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

// give 1 point & create new pipe
if(pipe[0] <= -pipeWidth){
currentScore++;
// check if it's the best score
bestScore = Math.max(bestScore, currentScore);

// remove & create new pipe
pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
console.log(pipes);
}

// if hit the pipe, end
if ([
pipe[0] <= cTenth + size[0], 
pipe[0] + pipeWidth >= cTenth, 
pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
].every(elem => elem)) {
gamePlaying = false;
setup();
}
})
}
// draw bird
if (gamePlaying) {
ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
flight += gravity;
flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
} else {
ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
flyHeight = (canvas.height / 2) - (size[1] / 2);
// text accueil
ctx.fillText(`Best score : ${bestScore}`, 85, 245);
ctx.fillText('Click to play', 90, 535);
ctx.font = "bold 30px courier";
}

document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

// tell the browser to perform anim
window.requestAnimationFrame(render);
}

// launch setup
setup();
img.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;

// (Comentário de linkamento repositório à máquina) Consegui!! 