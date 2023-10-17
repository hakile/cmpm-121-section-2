import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score: number = 0;
SetText("Click to start!");

let isJumping: boolean = false;
let gameOver: boolean = true;

document.addEventListener("mousedown", Jump);
document.addEventListener("keydown", (key) => {
  if (key.code == "Space" || key.code == "ArrowUp") {
    Jump();
  }
});

requestAnimationFrame(Main);

function Main() {
  if (!gameOver) {
    score++;
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
}

function RemoveObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function CheckGameOver() {
  if (!gameOver && dino != null && cactus != null && bird != null) {
    //get pos of upper bound of dinosaur sprite
    let dinoTop: number = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get pos of left bound of cactus sprite
    let cactusleft: number = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get pos of left bound of bird sprite
    let birdleft: number = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect obstacle collision
    if (
      (dinoTop >= 125 && Math.abs(cactusleft) < 7) ||
      (dinoTop <= 100 && Math.abs(birdleft) < 11)
    ) {
      //end game
      console.log("Player died!");
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

function SetText(newText: string) {
  if (scoreText) {
    scoreText.textContent = newText;
  }
}
