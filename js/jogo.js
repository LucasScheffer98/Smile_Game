let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

function limparTabuleiro() {
  const divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (["0", "1", "2", "3"].includes(divis[i].id)) {
      divis[i].className = "inicial";
      divis[i].innerHTML = "";
    }
  }
}

function alternarBotoes(mostrarJogarNovamente) {
  if (mostrarJogarNovamente) {
    btnJogarNovamente.className = "visivel";
    btnReiniciar.className = "invisivel";
  } else {
    btnJogarNovamente.className = "invisivel";
    btnReiniciar.className = "visivel";
  }
}

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  limparTabuleiro();
  atualizaPlacar();
  alternarBotoes(true);
}

function jogarNovamente() {
  jogar = true;
  limparTabuleiro();
}

function atualizaPlacar() {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function adicionarImagem(obj, tipo) {
  const img = new Image(100);
  
  if (tipo === "acerto") {
    img.id = "imagem";
    img.src = "https://www.shutterstock.com/shutterstock/photos/2531946699/display_1500/stock-photo-smiling-d-emoji-with-giant-star-eyes-starry-eyed-round-face-with-stars-happy-d-emoji-with-2531946699.jpg";
    obj.className = "acertou";
  } else {
    img.id = "imageme" + obj.id; // ID único para cada carta errada
    img.src = "https://cdn.pixabay.com/photo/2020/02/08/00/40/emoji-4828792_1280.png";
    obj.className = "errou";
  }
  
  obj.appendChild(img);
}

function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }
  
  jogar = false;
  tentativas++;
  
  const sorteado = Math.floor(Math.random() * 4);
  const objSorteado = document.getElementById(sorteado);
  
  if (obj.id == sorteado) {
    adicionarImagem(obj, "acerto");
    acertos++;
  } else {
    adicionarImagem(objSorteado, "acerto");
    adicionarImagem(obj, "erro");
  }
  
  atualizaPlacar();
  
  if (tentativas === 4) {
    alternarBotoes(false);
  }
}

btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);