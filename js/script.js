const gorila = {
  vida: 100,
  ataques: 0,
  defendendo: false
};

let humanos = new Array(100).fill(true);
let podeDefender = true;

const vidaEl = document.getElementById("gorilaVida");
const ataquesEl = document.getElementById("ataques");
const humanosEl = document.getElementById("humanosRestantes");
const logEl = document.getElementById("log");
const humanosContainer = document.getElementById("humanos");

function init() {
  const save = JSON.parse(localStorage.getItem("jogoGorila"));
  if (save) {
    gorila.vida = save.vida;
    gorila.ataques = save.ataques;
    humanos = save.humanos;
  }
  atualizarTela();
  desenharHumanos();
  humanosAtacam();
}

init();


function salvarEstado() {
  localStorage.setItem(
    "jogoGorila",
    JSON.stringify({
      vida: gorila.vida,
      ataques: gorila.ataques,
      humanos
    })
  );
}

function desenharHumanos() {
  humanosContainer.innerHTML = "";
  humanos.forEach((vivo) => {
    const div = document.createElement("div");
    div.classList.add("humano");
    if (!vivo) div.classList.add("morto");
    humanosContainer.appendChild(div);
  });
}
