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
let speedJoker = 5;

// Penguin Images Variables
let penguinX = 400;
let penguinY = 200;
let penguinW = 60;
let penguinH = 80;
let speedpenguin = 12;

// Bat Signal Images Variables
let batSignalX = 600;
let batSignalY = 200;
let batSignalW = 45;
let batSignalH = 40;
let speedbatSignal = 12;

// Bat Images Variables
let batX = 800;
let batY = 200;
let batW = 23;
let batH = 19;
let speedBat = 15;

let isBatmanGoingLeft = false;
let isBatmanGoingRight = false;

// Score Variables
let newScore = 0;
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
const gameBoardPage = document.getElementById("game-board"); // What to target here? The Main div ID or the canvas div ID?
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

// Elements Falling from  the Sky
/*let elementsArray = [
    { x: middle, y: -200 },
    { x: middle - 200, y: -600 },
    { x: middle, y: -900 },
    { img: joker, x: middle, y: -200, width: jokerW, height: jokerH },
    { img: penguin, x: middle - 200, y: -1000, width: penguinW, height: penguinH },
    { img: batSignal, x: middle, y: -1800, width: batSignalW, height: batSignalH },
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
    gameMusic.play() // to pause: gameMusic.pause()
 
    animationFrameId = requestAnimationFrame(startGame);
};

function drawImages() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(batmanRight, batmanRightX, batmanRightY, batmanRightW, batmanRightH);
    ctx.drawImage(joker, jokerX, jokerY, jokerW, jokerH);
    ctx.drawImage(penguin, penguinX, penguinY, penguinW, penguinH);
    ctx.drawImage(batSignal, batSignalX, batSignalY, batSignalW, batSignalH);
    ctx.drawImage(bat, batX, batY, batW, batH);
}

function moveBatman() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isBatmanGoingLeft) { // Later change Batman image to go left
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

/*function moveElements () {

    for (let i = 0; i < elementsArray.length; i++) {
        ctx.drawImage(carPink, elementsArray[i].x, elementsArray[i].y, 80, 110);
        ctx.drawImage(
            elementsArray[i].img,
            elementsArray[i].x,
            elementsArray[i].y,
            elementsArray[i].width,
            elementsArray[i].height
        );
        elementsArray[i].y += speed;
        //ctx.drawImage(car, middle + 50, height, 80, 150);
        if (elementsArray[i].y > canvas.height) {
            elementsArray[i].y = -700;
            elementsArray[i].y = -1900;
        }
    }
}; */

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
    // Trying to divide scores. Is this newScore
     if (newScore <= 5) {
         prompt(`Wow ${player}! You're really bad at this... Sure you want this to be on record?`);
     } else if (newScore > 5 && newScore <= 10) {
        prompt(`Not bad ${player}! You tried it right? That's what losers say. Go back and get better!`);
     } else if (newScore > 10 && newScore < 14) {
        prompt(`Almost there ${player}! But anyway...Batman is still blind so not much of a help here`);
     } else {
        prompt(`YEAH ${player}! You did it! Batman regained his X-Ray vision again!`);
     }
     
    // Attempt to insert players score to the HighScores List
     let currentHighScore = {name: player, score: newScore};
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
function gameOver () {
    gameOverPage.style.display = "block";
    canvas.style.display = "none";
    splashPage.style.display = "none";
    gamePlayDiv.style.display = "none";
    youWinPage.style.display = "none";
    gameMusic.pause()
    gameOverMusic.play()
}

// What happens when Player wins
function youWin () {
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
