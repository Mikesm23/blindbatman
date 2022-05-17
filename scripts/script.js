// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gamePlayDiv = document.querySelector("#gameplay");

// Canvas Background
let bg = new Image();
bg.src = "/images/bgimage.jpeg";
canvas.style.border = "4px solid #FEE202";

// Audio
let gameMusic = new Audio("/audio/batman.mp3");
gameMusic.volume = 0.1;
let hitSound = new Audio("/audio/hit.m4a");
hitSound.volume = 0.1;
let sighSound = new Audio("/audio/sigh.m4a");
sighSound.volume = 0.1;
let defeatSound = new Audio("/audio/game_defeat.m4a");
defeatSound.volume = 0.1;
let gameOverMusic = new Audio("/audio/gameover_sound.m4a");
gameOverMusic.volume = 0.1;
let winSound = new Audio("/audio/winsound.m4a");
winSound.volume = 0.1;



// Batman Related Variables
let batmanRightW = 100;
let batmanRightH = 104;
let batmanRightX = (canvas.width - batmanRightW) / 2;
let batmanRightY = canvas.height - batmanRightH;


/*let batmanLeftX = 100; 
let batmanLeftY = 104; 
let batmanLeftW = 100;
let batmanLeftH = 104;*/

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
let batX = 800;
let batY = 200;
let batW = 23;
let batH = 19;
let speedBat = 6;

let isBatmanGoingLeft = false;
let isBatmanGoingRight = false;

// Score Variables
const scoreNumber = document.querySelector("#score-number")
let score = 0;
let highScores = [];
let highScoresTable = document.getElementById("high-scores-table");

// GameOver Variable
let gameIsOver = false;

// YouWin Variable
let youWin = false;

// Health Status Variable
let health = 5;

// Player Variable
let player = '';

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
let bat = new Image();
bat.src = "/images/bat.png";

let animationFrameId;

// Generate rendom positions for the elements falling
let randomXPlacement = () => {
    let biggestX = canvas.width - 20; // what is this?
    let smallestX = 50;
    let randomX = Math.floor(
      Math.random() * (biggestX - smallestX + 1) + smallestX
    );
    console.log(randomX);
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
    /*{ img: joker, x: randomXPlacement(), y: -675, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -775, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -875, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -975, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -1075, width: jokerW, height: jokerH},
    { img: joker, x: randomXPlacement(), y: -1175, width: jokerW, height: jokerH},*/
  ];

  let penguinArray = [
    { img: penguin, x: randomXPlacement(), y: -100, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -300, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -500, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -700, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -900, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1100, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1300, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1500, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1700, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1900, width: penguinW, height: penguinH},
    /*{ img: penguin, x: randomXPlacement(), y: -1050, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1150, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1250, width: penguinW, height: penguinH},
    { img: penguin, x: randomXPlacement(), y: -1350, width: penguinW, height: penguinH},*/
  ];

  let batSignalArray = [
    { img: batSignal, x: randomXPlacement(), y: -100, width: batSignalW, height: batSignalH},
    { img: batSignal, x: randomXPlacement(), y: -600, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1100, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1600, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -2100, width: batSignalW, height: batSignalH  },
    /*{ img: batSignal, x: randomXPlacement(), y: -600, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -700, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -800, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -900, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1000, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1100, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1200, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1300, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1400, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1500, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1600, width: batSignalW, height: batSignalH },
    { img: batSignal, x: randomXPlacement(), y: -1700, width: batSignalW, height: batSignalH  },
    { img: batSignal, x: randomXPlacement(), y: -1800, width: batSignalW, height: batSignalH },*/
  ];

  /*let batArray = [
    { img: bat, x: 600, y: -900 },
    { img: bat, x: 600, y: -1800, width: batW, height: batH },
  ];*/



// All the functions
/* function animate() {
    startGame()
};
*/



function startGame() {
    // getPlayerName()
    canvas.style.display = "block";
    gamePlayDiv.style.display = "block";
    splashPage.style.display = "none";
    gameOverPage.style.display = "none";
    youWinPage.style.display = "none";
    drawImages()
    moveBatman()
    moveElements()
    // gameMusic.play()
 
    animationFrameId = requestAnimationFrame(startGame);
};

function drawImages() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(batmanRight, batmanRightX, batmanRightY, batmanRightW, batmanRightH);
}

function moveBatman() {
    if (isBatmanGoingLeft) {
        if (batmanRightX > 0) {
            batmanRight.src = "/images/bb_goleft.png";
            console.log('isBatmanGoingLeft');
            batmanRightX -= batmanSpeed;
        }
      } else if (isBatmanGoingRight) {
        if (batmanRightX < canvas.width - batmanRightW) {
            batmanRight.src = "/images/bb_goright.png";
            console.log('isBatmanGoingRight');
            batmanRightX += batmanSpeed;
        }
      }
};

function moveElements () {

    for (let i = 0; i < jokerArray.length; i++) {
        ctx.drawImage(jokerArray[i].img, jokerArray[i].x, jokerArray[i].y, jokerArray[i].width, jokerArray[i].height);
        jokerArray[i].y += speedJoker;
        if (jokerArray[i].y > canvas.height) {
            jokerArray[i].y = -100;
        }
    }

    for (let i = 0; i < penguinArray.length; i++) {
        ctx.drawImage(penguinArray[i].img, penguinArray[i].x, penguinArray[i].y, penguinArray[i].width, penguinArray[i].height);
        penguinArray[i].y += speedPenguin;
        if (penguinArray[i].y > canvas.height) {
            penguinArray[i].y = -100;
        }
    }

    for (let i = 0; i < batSignalArray.length; i++) {
        ctx.drawImage(batSignalArray[i].img, batSignalArray[i].x, batSignalArray[i].y, batSignalArray[i].width, batSignalArray[i].height);
        batSignalArray[i].y += speedBatSignal;
        if (batSignalArray[i].y > canvas.height) {
            batSignalArray[i].y = -100;
        }
    }

   /* for (let i = 0; i < batArray.length; i++) {
        ctx.drawImage(batArray[i].img, batArray[i].x, batArray[i].y, batArray[i].width, batArray[i].height);
        batArray[i].y += speedBat;
        if (batArray[i].y > canvas.height) {
            batArray[i].y = -1900;
        }
    } */

};

// Collisions and points
/*
// Joker Collisions
for (let i = 0; i < jokerArray.length; i++) {
    ctx.drawImage(
    jokerArray[i].img,
    jokerArray[i].x,
    jokerArray[i].y,
    jokerArray[i].width,
    jokerArray[i].height
    );
    jokerArray[i].y += jokerSpeed;
    if (jokerArray[i].y > canvas.height) {
        jokerArray[i].y = -5500; // It's sent way up? It's not what we did in the moveElements()?
    }
    if (
        // checks if the bottom of the traffic car is touching the top of the player car
        jokerArray[i].y + jokerArray[i].height >= batmanRightY + 10 && //why + 10?
        //checks if the right side of the player car is more to the right than the traffic car
        batmanRightX + 120 > jokerArray[i].x &&
        // checks if the left side of the player car is touching the left side of the traffic car
        batmanRightX < jokerArray[i].x + jokerArray[i].width &&
        //checks if the bottom of the player car is touching the top of the traffic car
        batmanRightY + batmanRightH - 10 > jokerArray[i].y
      ) {
        health = health - 1;
      }
      if (health <= 0) {
        gameOver()
      }
};
*/
/*
// Bat Signal Points
for (let i = 0; i < batSignalArray.length; i++) {
    ctx.drawImage(
    batSignalArray[i].img,
    batSignalArray[i].x,
    batSignalArray[i].y,
    batSignalArray[i].width,
    batSignalArray[i].height
    );
    batSignalArray[i].y += batSignalSpeed;
    if (batSignalArray[i].y > canvas.height) {
        batSignalArray[i].y = -5500; // It's sent way up? It's not what we did in the moveElements()?
    }
    if (
        // checks if the bottom of the traffic car is touching the top of the player car
        batSignalArray[i].y + batSignalArray[i].height >= batmanRightY + 10 &&
        //checks if the right side of the player car is more to the right than the traffic car
        batmanRightX + 120 > batSignalArray[i].x &&
        // checks if the left side of the player car is touching the left side of the traffic car
        batmanRightX < batSignalArray[i].x + batSignalArray[i].width &&
        //checks if the bottom of the player car is touching the top of the traffic car
        batmanRightY + batmanRightH - 10 > batSignalArray[i].y
      ) {
        score += 1;
        scoreNumber.innerHTML = score;
      }
    if (score === 15) {
        youWin()
    }
};    
*/
/* function getPlayerName() {
    player = prompt("Hello! Who is going to help Batman today?");
    if (player != null) {
        greet()
    } else {
        player = prompt("Please repeat");
    }
  };

function greet() {
    alert("Hello " + player + "! Feeling strong? Let's go!";);
};
window.onload = greet;


function insertScore() {
    // Trying to divide scores.
     if (score <= 5) {
         prompt(`Wow ${player}! You're really bad at this... Sure you want this to be on record?`);
     } else if (score > 5 && score <= 10) {
        prompt(`Not bad ${player}! You tried it right? That's what losers say. Go back and get better!`);
     } else if (score > 10 && score < 14) {
        prompt(`Almost there ${player}! But anyway...Batman is still blind so not much of a help here`);
     } else {
        prompt(`YEAH ${player}! You did it! Batman regained his X-Ray vision again!`);
     }
     
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
/*
// What happens when Player lose
function gameOver() {
    gameOverPage.style.display = "block";
    canvas.style.display = "none";
    splashPage.style.display = "none";
    gamePlayDiv.style.display = "none";
    youWinPage.style.display = "none";
    gameMusic.pause()
    gameOverMusic.play()
}

// What happens when Player wins
function youWin() {
    youWinPage.style.display = "block";
    gameOverPage.style.display = "none";
    canvas.style.display = "none";
    splashPage.style.display = "none";
    gamePlayDiv.style.display = "none";
    gameMusic.pause()
    winSound.play()
}
*/

function restartGame() {
    startGame()
};

function tryAgain() {
    startGame()
};

function playAgain() {
    startGame()
};

function muteAudio() {
    gameMusic.muted = true
    hitSound.muted = true
    sighSound.muted = true
    defeatSound.muted = true
    gameOverMusic.muted = true
    winSound.muted = true   
}

function unmuteAudio() {
    gameMusic.play = false
    hitSound.play = false
    sighSound.play = false
    defeatSound.play = false
    gameOverMusic.play = false
    winSound.play = false
}

// Navigation (what happens when page loads)
window.addEventListener("load", () => {
    gamePlayDiv.style.display = "none";
    gameOverPage.style.display = "none";
    youWinPage.style.display = "none";
    startBtn.addEventListener("click", () => {
    startGame();
        console.log("start button pushed!");
  });
    restartBtn.addEventListener("click", () => {
    startGame();
    console.log("restart button pushed!");
  });
    tryAgainBtn.addEventListener("click", () => {
    restartGame();
    console.log("try again button pushed!");
  });
    playAgainBtn.addEventListener("click", () => {
    restartGame();
    console.log("play again button pushed!");
  });
    
    /*switchAudio.addEventListener("click", () => {
    muteAudio();
    if (muteAudio === false) {
        let soundBtn = document.querySelector('.sound');
        soundBtn.setAttribute("src", "/images/sound_on.png");
        console.log("mute audio button pushed!");
    } else {
        let soundBtn = document.querySelector('.sound');
        soundBtn.setAttribute("src", "/images/sound_off.png");
        console.log("unmute audio button pushed!");   
    }      
  });*/
  
/*
    switchAudio.addEventListener("click", () => {
    unmuteAudio();
    let soundBtn = document.querySelector('.sound');
    soundBtn.setAttribute("src", "/images/sound_off.png");
    console.log("unmute audio button pushed!");
  });
  */
});


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
