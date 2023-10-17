import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score: number = 0;
SetText("click to start!");

let isJumping: boolean = false;
let gameOver: boolean = true;

document.addEventListener("mousedown", () => Jump());

requestAnimationFrame(Main);

function Main() {
  if (!gameOver) {
    score = score + 1;
    SetText("Score: " + score.toString());

    CheckGameOver();
  }
  requestAnimationFrame(Main);
}

function Jump() {
  if (!gameOver) {
    if (!isJumping) {
      isJumping = true;
      dino?.classList.add("jump");
      setTimeout(RemoveJump, 650);
    }
  } else {
    StartGame();
  }
}

function RemoveJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function RemoveObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function CheckGameOver() {
  if (!gameOver && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    let dinoTop: number = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    let cactusleft: number = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    let birdleft: number = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect cactus collision
    if (dinoTop >= 150 && Math.abs(cactusleft) < 7) {
      //end game
      console.log("player died!");
      SetText("Final Score: " + score.toString() + "! Click To Play Again!");
      gameOver = true;

      //reset player
      RemoveJump();

      //reset cactus
      RemoveObstacles();
    }

    //detect bird collision
    if (dinoTop <= 55 && Math.abs(birdleft) < 11) {
      //end game
      console.log("player died!");
      SetText("Final Score: " + score.toString() + "! Click To Play Again!");
      gameOver = true;

      //reset player
      RemoveJump();

      //reset cactus
      RemoveObstacles();
    }
  }
}

function StartGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function SetText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
