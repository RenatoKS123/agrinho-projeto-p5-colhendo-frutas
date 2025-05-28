let personagem;
let velocidade = 5;
let emojiPersonagem = "🧑‍🌾";

let frutas = ["🍎", "🍌", "🍇", "🍓", "🍍"];
let frutasAtivas = [];
let intervalo = 60;

let pontuacao = 0;
let venceu = false;

function setup() {
  createCanvas(600, 400);
  textSize(36);
  textAlign(CENTER, CENTER);
  personagem = {
    x: width / 2,
    y: height - 50,
    largura: 48
  };
}

function draw() {
  background('rgb(38,167,233)');
  fill('green');
   rect(0,370, 600, 40);

  if (venceu) {
    fill(0, 200, 0);
    textSize(48);
    text("🎉 Você venceu! 🎉", width / 5, height / 2);
    return;
  }

  // Mostrar personagem
  text(emojiPersonagem, personagem.x, personagem.y);

  // Movimento
  if (keyIsDown(65)) personagem.x -= velocidade;
  if (keyIsDown(68)) personagem.x += velocidade;
  personagem.x = constrain(personagem.x, 24, width - 24);

  // Criar frutas
  if (frameCount % intervalo === 0) {
    let novaFruta = {
      emoji: random(frutas),
      x: random(24, width - 24),
      y: -30,
      velocidade: random(2, 4)
    };
    frutasAtivas.push(novaFruta);
  }

  // Atualizar e desenhar frutas
  for (let i = frutasAtivas.length - 1; i >= 0; i--) {
    let fruta = frutasAtivas[i];
    fruta.y += fruta.velocidade;
    text(fruta.emoji, fruta.x, fruta.y);

    let d = dist(fruta.x, fruta.y, personagem.x, personagem.y);
    if (d < 30) {
      pontuacao += 1;
      frutasAtivas.splice(i, 1);
      continue;
    }

    if (fruta.y > height) {
      pontuacao -= 1;
      frutasAtivas.splice(i, 1);
    }
  }

  // Mostrar pontuação
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Pontuação: " + pontuacao, 10, 10);

  // Verifica vitória
  if (pontuacao >= 25) {
    venceu = true;
  }
}