const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector(".score span");
const strBtn = document.querySelector(".start");

// määritetään pelin yleisiä muuttujia
const width = 10;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let intervalTime = 500;
let interval = 0;
let appleIndex = 0;
let speed = 0.9;

function moveOutComes() {
  // katsotaan osuuko mato oikeaan seinään
  if (direction === 1 && currentSnake[0] % width === width - 1) {
    alert("osuit oikeaan seinään. GAME OVER");
    return clearInterval(interval);
  }

  // katsotaan osuuko mato vasempaan seinään
  if (direction === -1 && currentSnake[0] % width === 0) {
    alert("osuit vasempaan seinään. GAME OVER");
    return clearInterval(interval);
  }

  // katsotaan osuuko mato kattoon
  if (direction === -width && currentSnake[0] < width) {
    alert("osuit kattoon. GAME OVER");
    return clearInterval(interval);
  }

  // katsotaan osuuko mato pohjaan
  if (direction === width && currentSnake[0] + width >= width * width) {
    alert("osuit pohjaan. GAME OVER");
    return clearInterval(interval);
  }

  // katsotaan osuuko mato itseensä
  if (squares[currentSnake[0] + direction].classList.contains("snake")) {
    alert("osuit itseesi. GAME OVER");
    return clearInterval(interval);
  }

  //poistetaan madon häntä [2,1,0]
 
  currentSnake.unshift(currentSnake[0] + direction);

  //currentSnake[12,2,1]

  if(squares[currentSnake[0]].classList.contains("apple")){
    squares[currentSnake[0]].classList.remove("apple");
    //squares[tail].classList.add("snake");
    //customElementsrrentSnake.push(tail)
    score++;
    scoreDisplay.innerHTML = score;
    randomApple();
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutComes, intervalTime);
    }else {
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
  }

  squares[currentSnake[0]].classList.add("snake");
  
}

function randomApple() {
  
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));

  squares[appleIndex].classList.add("apple");
}

function startGame() {
  //tyhjennetään intervalli
  clearInterval(interval);

  // poistetaan mato pelialueelle
  currentSnake.forEach((snakeIndex) =>
    squares[snakeIndex].classList.remove("snake")
  );

  // poistetaan omena pelialueelta
  squares[appleIndex].classList.remove("apple");

  //alustetaan pelin muuttujat
  score = 0;
  scoreDisplay.innerHTML = score;
  direction = 1;
  intervalTime = 500;
  currentSnake = [2, 1, 0];

  // lisätään mato pelialueelle
  currentSnake.forEach((snakeIndex) =>
    squares[snakeIndex].classList.add("snake")
  );

  randomApple();
  

  interval = setInterval(moveOutComes, intervalTime);
}

function control(e) {
  //console.log(e.keyCode);

  if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 40) {
    direction = width;
  }
}

strBtn.addEventListener("click", startGame);
document.addEventListener("keyup", control);
