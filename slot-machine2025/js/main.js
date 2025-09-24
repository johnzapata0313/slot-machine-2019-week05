//ITEMS PULLED FROM GOOGLE GEMNI//

const teams = [
  {
    name: "Eagles",
    img: "https://upload.wikimedia.org/wikipedia/en/8/8e/Philadelphia_Eagles_logo.svg"
  },
  {
    name: "76ers",
    img: "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg"
  },
  {
    name: "Flyers",
    img: "file:///Users/johnzapata/slot-machine2025/Images/Philadelphia_Flyers.svg"
  },
  {
    name: "Phillies",
    img: "file:///Users/johnzapata/slot-machine2025/Images/philadelphia_phillies_logo_primary_19922235.png"
  },
  {
    name: "Union",
    img: "file:///Users/johnzapata/slot-machine2025/Images/Philadelphia_Union_2018_logo.svg.png"
  }
];

let balance = 100;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const spinButton = document.getElementById("spinButton");
const restartButton = document.getElementById("restartButton");

function getRandomTeam() {
  return teams[Math.floor(Math.random() * teams.length)];
}

function updateBalanceDisplay() {
  balanceEl.textContent = `Balance: $${balance}`;
}
//CONTENT PULLED FROM GOOGLE GEMNI//
function checkGameOver() {
  if (balance < 20) {
    resultEl.innerHTML = `💀 Game Over! You're out of money.`;
    resultEl.style.color = "gray";
    spinButton.disabled = true;
    return true;
  }
  return false;
}

function resetGame() {
  balance = 100;
  updateBalanceDisplay();
  resultEl.textContent = "";
  spinButton.disabled = false;
  document.getElementById("reel1").innerHTML = "";
  document.getElementById("reel2").innerHTML = "";
  document.getElementById("reel3").innerHTML = "";
}

spinButton.addEventListener("click", () => {
  const bet = parseInt(document.getElementById("bet").value);

  if (balance < bet) {
    resultEl.textContent = "Not enough balance for this bet.";
    resultEl.style.color = "orange";
    return;
  }

  balance -= bet;
//CONTENT PULLED FROM GOOGLE GEMNI//
  const reel1 = getRandomTeam();
  const reel2 = getRandomTeam();
  const reel3 = getRandomTeam();

  document.getElementById("reel1").innerHTML = `<img src="${reel1.img}" alt="${reel1.name}">`;
  document.getElementById("reel2").innerHTML = `<img src="${reel2.img}" alt="${reel2.name}">`;
  document.getElementById("reel3").innerHTML = `<img src="${reel3.img}" alt="${reel3.name}">`;

  let resultText = "";
  let winnings = 0;

  if (reel1.name === reel2.name && reel2.name === reel3.name) {
    winnings = bet * 10;
    resultText = `🎉 JACKPOT! You won $${winnings}!`;
    resultEl.style.color = "limegreen";
  } else if (
    reel1.name === reel2.name ||
    reel2.name === reel3.name ||
    reel1.name === reel3.name
  ) {
    winnings = bet * 2;
    resultText = `🤙🏽 You got a pair! You win $${winnings}.`;
    resultEl.style.color = "#FFD700";
  } else {
    resultText = `😩 No match. You lost $${bet}.`;
    resultEl.style.color = "red";
  }

  balance += winnings;
  updateBalanceDisplay();
  resultEl.textContent = resultText;

  checkGameOver();
});
//CONTENT PULLED FROM GOOGLE GEMMNI//
restartButton.addEventListener("click", resetGame);
