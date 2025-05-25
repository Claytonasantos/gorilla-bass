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
