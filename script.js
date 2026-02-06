let currentPage = 1;
let selected = [];
let solvedGroups = 0;

const groups = [
  ["Fragrances", "Classics", "Curl cream", "Smosh"],
  ["Football", "NYT Connections", "Pink Floyd", "Creatine"],
  ["Coffee", "Roses", "Perfume", "Baggy jeans"],
  ["Boots", "Passport", "Phone", "Purse light"]
];

const words = groups.flat().sort(() => Math.random() - 0.5);

function goToPage(n) {
  document.getElementById(`page${currentPage}`).classList.remove("active");
  document.getElementById(`page${n}`).classList.add("active");
  currentPage = n;
}

function createGrid() {
  const grid = document.getElementById("grid");
  words.forEach(word => {
    const div = document.createElement("div");
    div.innerText = word;
    div.className = "word";
    div.onclick = () => selectWord(div, word);
    grid.appendChild(div);
  });
}

function selectWord(div, word) {
  if (div.classList.contains("correct")) return;

  div.classList.toggle("selected");

  if (selected.includes(word)) {
    selected = selected.filter(w => w !== word);
  } else {
    selected.push(word);
  }

  if (selected.length === 4) {
    checkGroup();
  }
}

function checkGroup() {
  for (let group of groups) {
    if (selected.every(word => group.includes(word))) {
      document.querySelectorAll(".word.selected").forEach(el => {
        el.classList.remove("selected");
        el.classList.add("correct");
      });
      solvedGroups++;
      selected = [];
      document.getElementById("message").innerText = "That feels right.";
      if (solvedGroups === 4) {
        setTimeout(() => goToPage(3), 1000);
      }
      return;
    }
  }
  document.getElementById("message").innerText = "Close, but not quite.";
  document.querySelectorAll(".word.selected").forEach(el => el.classList.remove("selected"));
  selected = [];
}

function moveNo() {
  const btn = document.getElementById("noBtn");
  btn.style.left = Math.random() * 100 - 50 + "px";
  btn.style.top = Math.random() * 40 - 20 + "px";
}

function yesClicked() {
  goToPage(5);
}

createGrid();
