let rnd = Math.floor(Math.random()*72)+1;
let reels = [rnd, rnd, rnd];
let win = false;
let winAmount = 0;
let bet = 0;
let balance = 1000;
let betAmount = 0;
let betAmounts = [1, 5, 10, 25, 50, 100, 500, 1000];
let betAmountIndex = 0;
let reel1 = document.getElementById("reel1");
let reel2 = document.getElementById("reel2");
let reel3 = document.getElementById("reel3");
let balanceDisplay = document.getElementById("balance");
let betAmountDisplay = document.getElementById("bet-amount");
let betAmountUp = document.getElementById("bet-amount-up");
let betAmountDown = document.getElementById("bet-amount-down");
let betUp = document.getElementById("bet-up");
let betDown = document.getElementById("bet-down");
let betDisplay = document.getElementById("bet");
let spin = document.getElementById("spin");
let winDisplay = document.getElementById("win");
let winAmountDisplay = document.getElementById("win-amount");
let winAmountUp = document.getElementById("win-amount-up");
let winAmountDown = document.getElementById("win-amount-down");
let winUp = document.getElementById("win-up");
let winDown = document.getElementById("win-down");
let winSound = new Audio("win.mp3");
let loseSound = new Audio("lose.mp3");
let spinSound = new Audio("spin.mp3");
let betSound = new Audio("bet.mp3");
let winAmountSound = new Audio("win-amount.mp3");
let betAmountSound = new Audio("bet-amount.mp3");
let balanceSound = new Audio("balance.mp3");
let reelSound = new Audio("reel.mp3");
let reelStopSound = new Audio("reel-stop.mp3");
let reelStopSound2 = new Audio("reel-stop2.mp3");
let reelStopSound3 = new Audio("reel-stop3.mp3");

function updateBalance() {
    balanceDisplay.innerHTML = balance;
}

function updateBetAmount() {
    betAmountDisplay.innerHTML = betAmounts[betAmountIndex];
}

function updateBet() {
    betDisplay.innerHTML = bet;
}

function updateWinAmount() {
    winAmountDisplay.innerHTML = winAmount;
}

function updateReels() {
    reel1.innerHTML = reels[0];
    reel2.innerHTML = reels[1];
    reel3.innerHTML = reels[2];
}

function updateWin() {
    winDisplay.innerHTML = win;
}

function update() {
    updateBalance();
    updateBetAmount();
    updateBet();
    updateWinAmount();
    updateWin();
    updateReels();
}

function spinReels() {
    reel1.classList.add("spin");
    reel2.classList.add("spin");
    reel3.classList.add("spin");
    reelSound.play();
}

function stopReels() {
    reel1.classList.remove("spin");
    reel2.classList.remove("spin");
    reel3.classList.remove("spin");
    reelStopSound.play();
}

