document.addEventListener("DOMContentLoaded", () => {
    const width = 10;
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const restartBtn = document.querySelector("#restart-button");
    let nextRandom = 0;
    let timerId
    let score = 0;

    const colours = [
        "rgb(149, 238, 185)", "rgb(83, 190, 243)", "rgb(199, 125, 242)", "rgb(242, 105, 169)", "rgb(225, 215, 122)"
    ]

    //The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    // console.log(lTetromino);

    const zTetromino = [
        [1, width + 1, width + 2, width * 2 + 2],
        [2, width + 2, width + 1, width * 2 + 1],
        [1, 2, width + 2, width + 3],
        [3, 2, width + 2, width + 1]
    ];

    const strTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [1, 2, 3, 4],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [1, 2, 3, 4]
    ];

    const sqTetromino = [
        [1, 2, width + 1, width + 2],
        [1, 2, width + 1, width + 2],
        [1, 2, width + 1, width + 2],
        [1, 2, width + 1, width + 2]
    ];

    const tTetromino = [
        [1, width + 1, width * 2 + 1, width + 2],
        [1, 2, 3, width + 2],
        [2, width + 2, width * 2 + 2, width + 1],
        [2, width + 1, width + 2, width + 3]
    ];


    const theTetrominoes = [lTetromino, zTetromino, strTetromino, sqTetromino, tTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation];

    //draw the first rotation in the first tetromino

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
            squares[currentPosition + index].style.backgroundColor = colours[random];
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
            squares[currentPosition + index].style.backgroundColor = "";
        })
    }


    //make the tetromino move down every second

    // timerId = setInterval(moveDown, 500);

    //assign functions to KeyCodes

    function control(e){
        if(e.keyCode === 37) {
            moveLeft()
        }else if(e.keyCode ===38){
            rotate()
        }else if(e.keyCode === 39){
            moveRight()
        }else if(e.keyCode ===40){
            moveDown()

        }
    }

    document.addEventListener("keyup", control);

    //moveDown function

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            //start a new one falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();

        }
    }


    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge) currentPosition -=1;
        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition +=1;
        }
        draw();
    }

    //move the tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);

        if(!isAtRightEdge) currentPosition +=1;
        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition -=1;
        }
        draw();
    }

//rotate the tetromino
function rotate(){
    undraw();
    currentRotation ++;
    if(currentRotation === current.length){
        currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
}


//show up-next tetromino in mini-grid
const displaySquares = document.querySelectorAll(".minigrid div")
const displayWidth = 4;
let displayIndex = 0;

//the Tetrominoes without rotations

const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [1, 2, displayWidth + 1, displayWidth + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth + 2],
]

//display the shape in the minigrid display

function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove("tetromino") //remove any trace of a tetromino form the entire grid
        square.style.backgroundColor = "";
    })
    upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add("tetromino");
        displaySquares[displayIndex + index].style.backgroundColor = colours[nextRandom];
    })
}


//add functionality to the button
startBtn.addEventListener("click", () => {
    if(timerId){
        clearInterval(timerId);
        timerId = null;
    }else {
        draw();
        timerId = setInterval(moveDown, 500);
        nextRandom = Math.floor(Math.random()*theTetrominoes.length);
        displayShape();
        addScore();
        
    }
})

restartBtn.addEventListener("click", () => {
    window.location.reload();
})

//add score
function addScore(){
    for(let i = 0; i < 199; i+=width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
        if(row.every(index => squares[index].classList.contains("taken"))){
            score +=10;
            scoreDisplay.innerHTML = score;
            row.forEach(index => {
                squares[index].classList.remove("taken");
                squares[index].classList.remove("tetromino");
                squares[index].style.backgroundColor = "";
            })
            const squaresRemoved = squares.splice(i, width);
            console.log(squaresRemoved);
            console.log(score);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }
}


//gave over
function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))){
        alert("Game over!\nYour score is " + score);
        clearInterval(timerId);
        window.location.reload();
    }
}
})