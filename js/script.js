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


function atualizarTela() {
  vidaEl.textContent = gorila.vida;
  ataquesEl.textContent = gorila.ataques;
  humanosEl.textContent = humanos.filter(h => h).length;
  desenharHumanos();
  salvarEstado();
  verificarFim();
}


function log(msg) {
  logEl.innerHTML += `<p>${msg}</p>`;
  logEl.scrollTop = logEl.scrollHeight;
}


function atacar() {
  if (gorila.vida <= 0) return;

  const som = document.getElementById("audioAtaque");
  if (som) {
    som.currentTime = 0;
    som.play();
  }

  let dano = Math.floor(Math.random() * 2) + 1; 
  let eliminados = 0;

  for (let i = 0; i < humanos.length && dano > 0; i++) {
    if (humanos[i]) {
      humanos[i] = false;
      eliminados++;
      dano--;
    }
  }

  if (eliminados > 0) {
    gorila.ataques++;
    log(`🦍 Gorila atacou e eliminou ${eliminados} humano(s).`);
    atualizarTela();
  }
}

function curar() {
  if (gorila.vida <= 0) return;
  const cura = Math.floor(Math.random() * 3) + 1;
  gorila.vida = Math.min(100, gorila.vida + cura);
  log(`💊 Gorila recuperou ${cura} de vida.`);
  atualizarTela();
}

function humanosAtacam() {
  setInterval(() => {
    const vivos = humanos.filter(h => h).length;
    if (vivos === 0 || gorila.vida <= 0) return;

    const dano = Math.floor(Math.random() * 10) + 1;
    const finalDano = gorila.defendendo ? Math.floor(dano / 2) : dano;

    gorila.vida -= finalDano;
    log(`👤 Humanos atacaram! Gorila perdeu ${finalDano} de vida.`);

    if (gorila.vida < 0) gorila.vida = 0;
    atualizarTela();
  }, 1200);
}
