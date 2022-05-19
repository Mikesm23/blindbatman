// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gamePlayDiv = document.querySelector("#gameplay");

// Canvas Background
let bg = new Image();
bg.src = "/images/bgimage.jpeg";
canvas.style.border = "4px solid #FEE202";

// Images Sources
let batmanRight = new Image();
batmanRight.src = "/images/bb_goright.png";
let batmanLeft = new Image();
batmanLeft.src = "/images/bb_goleft.png";
let joker = new Image();
joker.src = "/images/joker.png";
let penguin = new Image();
penguin.src = "/images/penguin.png";
let batSignal = new Image();
batSignal.src = "/images/batsignal.png";
let lemon = new Image();
lemon.src = "/images/lemon.png";
let winImage = new Image();
winImage.src = "/images/yeah_win.png";
// If time add sprite image of bat

// Audio
let introMusic = new Audio("/audio/intro_song.m4a");
introMusic.volume = 0.1; // Played in Splash Page
let gameMusic = new Audio("/audio/batman.mp3");
gameMusic.volume = 0.1; // Played in Gameplay Page
let hitSound = new Audio("/audio/hit.m4a");
hitSound.volume = 0.5; // Played when Batman is hit
let sighSound = new Audio("/audio/sigh.m4a");
sighSound.volume = 0.5; // Played when Batman improves health
let catchSound = new Audio("/audio/catch.m4a");
catchSound.volume = 1,5; // Played when Batman catches symbol
let defeatSound = new Audio("/audio/game_defeat.m4a");
defeatSound.volume = 1; // Played when player loses
let gameOverMusic = new Audio("/audio/gameover_sound.m4a");
gameOverMusic.volume = 0.5; // Played when Gameover page loads
let yeahSound = new Audio("/audio/yeah.m4a");
yeahSound.volume = 0.7; // Played when player wins
let winSound = new Audio("/audio/winsound.m4a");
winSound.volume = 0.5; // Played when Winner page loads

// Pages
const splashPage = document.querySelector(".splashpage");
const gameBoardPage = document.getElementById("game-board");
const gameOverPage = document.getElementById("gameover");
const youWinPage = document.getElementById("winner");

// Buttons
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let tryAgainBtn = document.querySelector("#tryagainBtn");
let playAgainBtn = document.querySelector("#playagainBtn");
let switchAudio = document.querySelector(".sound");
let healthBarImg = document.querySelector("#health-bar");
let soundOnBtn = document.querySelector('.sound');
let soundOffBtn = document.querySelector('.sound');

let gameOverText = document.querySelector("#go_uktext");
let winnerText = document.querySelector("#yw_uktext");
let playerInsert = document.querySelector("#player-name");

// Batman Related Variables
let batmanW = 100;
let batmanH = 104;
let batmanX = (canvas.width - batmanW) / 2;
let batmanY = canvas.height - batmanH;
let batmanSpeed = 10;

// Joker Images Variables
let jokerX = 200;
let jokerY= 200;
let jokerW = 60;
let jokerH = 72;
let speedJoker = 6;

// Penguin Images Variables
let penguinX = 400;
let penguinY = 200;
let penguinW = 60;
let penguinH = 80;
let speedPenguin = 4;

// Bat Signal Images Variables
let batSignalX = 600;
let batSignalY = 200;
let batSignalW = 45;
let batSignalH = 40;
let speedBatSignal = 2;

// Bat Images Variables
let lemonX = 800;
let lemonY = 200;
let lemonW = 46;
let lemonH = 38;
let speedLemon = 1;

let isBatmanGoingLeft = false;
let isBatmanGoingRight = false;

// Score Variables
let scoreNumber = document.querySelector("#score-number")
let score = 0;
let highScores = [];
let highScoresTable = document.getElementById("high-scores-table");

// GameOver Variable
let gameIsOver = false;

// YouWin Variable
let youWon = false;

// Health Status Variable
let health = 6;

// Player Variable
let player = '';

// Generate random positions for the elements falling
let randomXPlacement = () => {
    let biggestX = canvas.width - 20; // what is this?
    let smallestX = 50;
    let randomX = Math.floor(
      Math.random() * (biggestX - smallestX + 1) + smallestX
    );
    return randomX;
  };

// Elements Falling from  the Sky
let jokerArray = [
    { img: joker, x: randomXPlacement(), y: -100, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -450, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -800, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -1150, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -1500, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -1850, width: jokerW, height: jokerH},
  ];

  let penguinArray = [
    { img: penguin, x: randomXPlacement(), y: -100, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -700, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -900, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1100, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1300, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1500, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1700, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1900, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -2100, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -2300, width: penguinW, height: penguinH},
  ];

  let batSignalArray = [
    { img: batSignal, x: randomXPlacement(), y: -100, width: batSignalW, height: batSignalH},
    { img: batSignal, x: randomXPlacement(), y: -1000, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1900, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -2800, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -3700, width: batSignalW, height: batSignalH  },
  ];

  let lemonArray = [
    { img: lemon, x: randomXPlacement(), y: -125, width: lemonW, height: lemonH},
    { img: lemon, x: randomXPlacement(), y: -1525, width: lemonW, height: lemonH},
  ];

let animationFrameId;

function startGame() {
    canvas.style.display = "block";
    gamePlayDiv.style.display = "block";
    splashPage.style.display = "none";
    gameOverPage.style.display = "none";
    youWinPage.style.display = "none";
    introMusic.pause()
    gameMusic.play()
    drawImages()
    moveBatman()
    moveElements()
 if (gameIsOver) {
    cancelAnimationFrame(animationFrameId)
    gameMusic.pause() 
 } else if (youWon) {
    cancelAnimationFrame(animationFrameId)
    gameMusic.pause() 
 } else {
  animationFrameId = requestAnimationFrame(startGame);
 }
};

function drawImages() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(batmanRight, batmanX, batmanY, batmanW, batmanH);
}

function moveBatman() {
    if (isBatmanGoingLeft) {
        if (batmanX > 0) {
            batmanRight.src = "/images/bb_goleft.png";
            console.log('isBatmanGoingLeft');
            batmanX -= batmanSpeed;
        }
      } else if (isBatmanGoingRight) {
        if (batmanX < canvas.width - batmanW) {
            batmanRight.src = "/images/bb_goright.png";
            console.log('isBatmanGoingRight');
            batmanX += batmanSpeed;
        }
      }
};

function moveElements () {
    
    // Joker Movement
    for (let i = 0; i < jokerArray.length; i++) {
        ctx.drawImage(jokerArray[i].img, jokerArray[i].x, jokerArray[i].y, jokerArray[i].width, jokerArray[i].height);
        jokerArray[i].y += speedJoker;
        if (jokerArray[i].y > canvas.height) {
            jokerArray[i].y = -100;
        }
        // Joker Collision
        if (
          //checks if the bottom of joker touches the top of batman
          jokerArray[i].y + jokerArray[i].height >= batmanY + 10 &&
          //checks if the right side of joker is more to the right than batman
          batmanX + batmanW > jokerArray[i].x &&
          //checks if the left side of joker is touching the left side of batman
          batmanX < jokerArray[i].x + jokerArray[i].width &&
          //checks if the bottom of Batman is touching the top of Joker
          batmanY + batmanH > jokerArray[i].y
        ) {jokerArray[i].y = -100
          health = health -2;
          hitSound.play()
        }
        // Health Bar Behaviour
        if (health >= 6) {
          healthBarImg.src = "/images/healthbar_full.png";
        } else if (health === 6) { 
          healthBarImg.src = "/images/healthbar_full.png";
        } else if (health === 5) {
          healthBarImg.src = "/images/healthbar_five.png";
        } else if (health === 4) {
          healthBarImg.src = "/images/healthbar_four.png";
        } else if (health === 3) {
          healthBarImg.src = "/images/healthbar_three.png";
        } else if (health === 2) {
          healthBarImg.src = "/images/healthbar_two.png";
        } else if (health === 1) {
          healthBarImg.src = "/images/healthbar_one.png";
        } else {
          healthBarImg.src = "/images/healthbar_empty.png";
          gameIsOver = true;
          defeatSound.play()
          setTimeout(() => gameOver(), 2500)
        }
    }
    // Penguin Movements
    for (let i = 0; i < penguinArray.length; i++) {
        ctx.drawImage(penguinArray[i].img, penguinArray[i].x, penguinArray[i].y, penguinArray[i].width, penguinArray[i].height);
        penguinArray[i].y += speedPenguin;
        if (penguinArray[i].y > canvas.height) {
            penguinArray[i].y = -100;
        }
        // Penguin Collision
        if (
          penguinArray[i].y + penguinArray[i].height >= batmanY + 10 &&
          batmanX + batmanW > penguinArray[i].x &&
          batmanX < penguinArray[i].x + penguinArray[i].width &&
          batmanY + batmanH > penguinArray[i].y
        ) {penguinArray[i].y = -100
          health = health -1;
          hitSound.play()
        }
    }
    // Lemon Movements Collision
    for (let i = 0; i < lemonArray.length; i++) {
      ctx.drawImage(lemonArray[i].img, lemonArray[i].x, lemonArray[i].y, lemonArray[i].width, lemonArray[i].height);
      lemonArray[i].y += speedLemon;
      if (lemonArray[i].y > canvas.height) {
        lemonArray[i].y = -2000;
      }
      // Lemon Collision
      if (
        lemonArray[i].y + lemonArray[i].height >= batmanY + 10  &&
        batmanX + batmanW > lemonArray[i].x &&
        batmanX < lemonArray[i].x + lemonArray[i].width &&
        batmanY + batmanH > lemonArray[i].y
      ) {lemonArray[i].y = -2000
        health = health + 1; // When we have 6 lemons we shouldn't have more lives. The max lives we should have is 6.
        sighSound.play()
      } 
  
  }
    // Bat Signal Movements Points & Collision
    for (let i = 0; i < batSignalArray.length; i++) {
        ctx.drawImage(batSignalArray[i].img, batSignalArray[i].x, batSignalArray[i].y, batSignalArray[i].width, batSignalArray[i].height);
        batSignalArray[i].y += speedBatSignal;
        if (batSignalArray[i].y > canvas.height) {
            batSignalArray[i].y = -100;
        }
        // Bat Signal Collision
        if (
          batSignalArray[i].y + batSignalArray[i].height >= batmanY &&
          batmanX + batmanW > batSignalArray[i].x &&
          batmanX < batSignalArray[i].x + batSignalArray[i].width &&
          batmanY + batmanH > batSignalArray[i].y
        ) {
          // Bat Signal Points
          // Bat Signals should increase the Score by 1
          batSignalArray[i].y = -100
          score += 1;
          catchSound.play()
          scoreNumber.innerHTML = score
        }         

        if (score === 15) { 
          // winImage.src = "/images/yeah_win.png";
          youWon = true;
          yeahSound.play()
          setTimeout(() => youWin(), 2500)
        }
    }
};

// Different scores texts.
function changeGameoverText() {
  
   if (score <= 5) {
    gameOverText.innerHTML = `Wow ${player}! You're really bad at this... Sure you want this to be on record?`;
   } else if (score > 5 && score <= 10) {
      gameOverText.innerHTML = `Not bad ${player}! You tried it right? That's what losers say. Go back and get better!`;
   } else if (score > 10 && score < 14) {
      gameOverText.innerHTML = `Almost there ${player}! But anyway...Batman is still blind so not much of a help here`;
   } else if (score === 15) {
      //playerInsert.innerHTML = player
      winnerText.innerHTML = `GREAT JOB ${player}! Batman is a lucky Super Hero to have you by his side. Impressive.
      Now he is seeing again!`; // I don't understand why this doesn't work!
      youWon = true;
      youWin()
   }
}

function getPlayerName() {
    player = prompt("Hello! Who is going to help Batman today?");  
    gamePlayDiv.style.display = "none";
    gameOverPage.style.display = "none";
    youWinPage.style.display = "none";
    if (player == "") {
    player = prompt("Please repeat");
    playerInsert.innerHTML = player;
    } else if (player != null) {
      playerInsert.innerHTML = player;
    } else {
      playerInsert.innerHTML = "player";
      // This one is also a mistery. It worked at somepoint...
    }
  };

/*
function greet() {
    alert("Hello " + player + "! Feeling strong? Let's go!";);
};
window.onload = greet;
     
    // Attempt to insert players score to the HighScores List
     let currentHighScore = {name: player, score: score};
     highScores.push(currentHighScore);
     let rank = highScores.sort((a,b) => {
        return b.score - a.score;
     });
     highscores = rank;
     console.log(rank)

};
*/


// What happens when Player loses
function gameOver() {
    gameMusic.pause()
    introMusic.pause()
    gameOverMusic.play()
    gameOverPage.style.display = "block";
    canvas.style.display = "none";
    splashPage.style.display = "none";
    gamePlayDiv.style.display = "none";
    youWinPage.style.display = "none";
    changeGameoverText()
}

// What happens when Player wins
function youWin() {
    gameMusic.pause()
    introMusic.pause()
    winSound.play()
    cancelAnimationFrame(animationFrameId)
    youWinPage.style.display = "block";
    gameOverPage.style.display = "none";
    canvas.style.display = "none";
    splashPage.style.display = "none";
    gamePlayDiv.style.display = "none";
    changeGameoverText() 
}

/*
function muteAudio() {
    introMusic.pause()
    gameMusic.pause()
    hitSound.pause()
    sighSound.pause()
    defeatSound.pause()
    gameOverMusic.pause()
    winSound.pause()   
}

function unmuteAudio() {
    introMusic.play()
    gameMusic.play()
    hitSound.play()
    sighSound.play()
    defeatSound.play()
    gameOverMusic.play()
    winSound.play()
}
*/

// Navigation (what happens when page loads)
window.addEventListener("load", () => {  
    introMusic.play()
    gamePlayDiv.style.display = "none";
    gameOverPage.style.display = "none";
    youWinPage.style.display = "none";
    getPlayerName()
    startBtn.addEventListener("click", () => {
    startGame();
        console.log("start button pushed!");
  });
    restartBtn.addEventListener("click", () => {
      location.reload()
    console.log("restart button pushed!");
  });
    tryAgainBtn.addEventListener("click", () => {
      location.reload()
    console.log("try again button pushed!");
  });
    playAgainBtn.addEventListener("click", () => {
      location.reload()
    console.log("play again button pushed!");
  });
});

 /*window.onload = function() {
    document.getElementById("intro-song").play();
  }*/
   /* 
  switchAudio.addEventListener("click", () => {
    if (muted) {
        soundOnBtn.setAttribute("src", "/images/sound_on.png");
        console.log("mute audio button pushed!");
    } else {
        soundOffBtn.setAttribute("src", "/images/sound_off.png");
        console.log("unmute audio button pushed!");   
    }      
  });
*/

// Commands Arrows
document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
      isBatmanGoingLeft = true;
    }
    if (event.code === "ArrowRight") {
      isBatmanGoingRight = true;
    }
  });
  
  document.addEventListener("keyup", event => {
    isBatmanGoingLeft = false;
    isBatmanGoingRight = false;
  });
