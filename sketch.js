//tamanho bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 22;
let raio = diametroBolinha / 2;

// velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//tamanho raquete
let xRaquete = 8;
let yRaquete = 160;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons jogo
let raquetada;
let ponto;
let trilha;

let chanceErrar = 0;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  Placar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

//cria bolinha
function mostraBolinha(){
  circle(xBolinha,yBolinha,diametroBolinha);
}

//movimento bolinha
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//colisao da bolinha com a borda
function verificaColisaoBorda(){
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

//colisao da raquete com a bolinha
function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if( colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function movimentaRaqueteOponente(){
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceErrar += 1
    if (chanceErrar >= 39){
    chanceErrar = 40
    }
  } else {
    chanceErrar -= 1
    if (chanceErrar <= 35){
    chanceErrar = 35
    }
  }
}

function Placar(){
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 0, 0))
  rect(230, 13, 40, 20);
  fill(255);
  text(meusPontos, 250, 30);
  fill(color(255, 0, 0))
  rect(350, 13, 40, 20);
  fill(255);
  text(pontosOponente, 370, 30);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
