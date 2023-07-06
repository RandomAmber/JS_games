const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector(".score span");
const strBtn = document.querySelector(".start");

// määritetään pelin yleisiä muuttujia
const width = 10;
let currentSnake = [2,1,0];
let direction = 1;
let score = 0;
let intervalTime = 1000;
let interval = 0;

function moveOutComes(){
    //alert(direction);
    //katsotaan osuuko mato oikeaan seinään
    if(direction === 1 && currentSnake[0] % width === (width - 1)){
        alert("Osuit oikeaan seinään. GAME OVER");
        return clearInterval(interval);

    }

    //katsotaan osuuko mato vasemaan seinään
    
    if(direction === -1 && currentSnake[0] % width === 0){
        alert("Osuit oikeaan seinään. GAME OVER");
        return clearInterval(interval);

    }

    //poistetaan madon häntä [2,1,0]
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake");

}

    function startGame(){

        currentSnake.forEach((snakeIndex) =>
        squares[snakeIndex].classList.remove("snake")
        );

    //alustetaan pelin muuttujat
    score = 0;
    scoreDisplay.innerHTML = score;
    direction = 1;
    intervalTime = 500;
    currentSnake = [2,1,0];

    // lisätään mato pelialueelle
    currentSnake.forEach(snakeIndex => 
        squares[snakeIndex].classList.add("snake")
    );

    interval = setInterval(moveOutComes, intervalTime);
    }

    function control(e){
        //console.log(e.keyCode);

        if(e.keyCode === 37){
            direction = -1;
        } else if(e.keyCode === 38){
            direction = -width;
        } else if(e.keyCode === 39){
            direction = 1;
        } else if(e.keyCode === 40){
            direction = width;
        }
    }

    strBtn.addEventListener("click", startGame);
    document.addEventListener("keyup", control);
